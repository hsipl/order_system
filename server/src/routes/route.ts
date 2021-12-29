import MainRoute from '../bases/route.abstract';
import BasicRoute from './basic.route';
import StoreRoute from './store.route';
import UserRoute from './user.route';
import TagRoute from "./tag.route";
<<<<<<< HEAD

=======
import ProductRoute from "./product.route";
>>>>>>> 0f5e1c7b12f8252d26295cbaee60ca1db512883c
// collect all the routes
const router: Array<MainRoute> = [
    new BasicRoute(), 
    new StoreRoute(), 
    new UserRoute(),
    new TagRoute(),
    new ProductRoute()
];

export default router;
