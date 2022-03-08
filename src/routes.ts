import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import { ensureAuthenticateUser } from './middlewares/ensureAuthenticateUser';
import { AuthenticateUserController } from './modules/account/authenticateUser/useCase/AuthenticateUserController';
import { CreateBebidaController } from './modules/bebidas/useCases/createBebida/CreateBebidaController';
import { FilterByVolumeController } from './modules/bebidas/useCases/filter/FilterByVolumeController';
import { FindAllBebidasController } from './modules/bebidas/useCases/findAllBebidas/FindAllBebidasController';
import { UpdateValorController } from './modules/bebidas/useCases/updateValor/UpdateValorController';
import { ReportUserController } from './modules/reports/useCses/reportUser/ReportUserController';
import { CreateUserController } from './modules/user/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from './modules/user/useCases/updateAvatar/UpdateUserAvatarController';



const routes = Router();

const createUserController = new CreateUserController()
const createBebidaController = new CreateBebidaController()
const authenticateUserController = new AuthenticateUserController()
const findAllBebidasController = new FindAllBebidasController()
const filterByVolumeController = new FilterByVolumeController()
const updateValorController = new UpdateValorController()
const reportUserController = new ReportUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))



routes.post("/user", createUserController.handle);
routes.post("/bebida/", ensureAuthenticateUser, createBebidaController.handle);
routes.post("/authenticate/user", authenticateUserController.handle);
routes.get("/findAllBebidas/", ensureAuthenticateUser, findAllBebidasController.handle);
routes.get("/bebidas/filterByVolume/", ensureAuthenticateUser, filterByVolumeController.handle);
routes.put("/bebidas/updateValor/:id", ensureAuthenticateUser, updateValorController.handle);
routes.put("/user/report/:id", ensureAuthenticateUser, reportUserController.handle);
routes.patch("/user/avatar", ensureAuthenticateUser, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
export { routes };