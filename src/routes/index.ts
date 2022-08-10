import { Router } from "express";

import { scheduleRoutes } from "./schedules.routes";

const router = Router();

router.use("/schedules", scheduleRoutes);

export { router };