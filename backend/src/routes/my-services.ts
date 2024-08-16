import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Service from "../models/service";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { ServiceType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// api/my-services
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerService")
      .notEmpty()
      .isNumeric()
      .withMessage("Service rate is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newService: ServiceType = req.body;

      // 1.Upload the images to Cloudinary
      const imageUrls = await uploadImages(imageFiles);
      newService.imageUrls = imageUrls;
      newService.lastUpdated = new Date();
      newService.userId = req.userId;

      // 3. Save the new service in our database
      const service = new Service(newService);
      await service.save();

      res.status(201).send(service);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ userId: req.userId });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const service = await Service.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ meaage: "Error fetching services" });
  }
});

router.put(
  "/:serviceId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try{
      const updatedService: ServiceType = req.body;
      updatedService.lastUpdated = new Date();

      const service = await Service.findOneAndUpdate({
        _id: req.params.serviceId,
        userId: req.userId,
      },
      updatedService,
      {new: true}
    );

    if(!service){
      return res.status(404).json({message: "Service not found"});
    }

    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);

    service.imageUrls = [
      ...updatedImageUrls,
      ...(updatedService.imageUrls || []),
    ];

    await service.save();
    res.status(201).json(service);
    
    } catch(error){
      res.status(500).json({message: "Something went wrong"});
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  // 2. If the upload was successful, add the URLs to the new service
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;