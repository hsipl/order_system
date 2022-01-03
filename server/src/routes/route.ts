import MainRoute from '../bases/route.abstract';
import BasicRoute from './basic.route';
import StoreRoute from './store.route';
import UserRoute from './user.route';
import TagRoute from "./tag.route";
<<<<<<< HEAD
import HandoverRoute from './handover.route';
=======
import ProductRoute from "./product.route";
>>>>>>> 1858c79e9ea655e0631aad47a71ad92f15f0e3af

// collect all the routes
const router: Array<MainRoute> = [
    new BasicRoute(), 
    new StoreRoute(), 
    new UserRoute(),
    new TagRoute(),
<<<<<<< HEAD
    new HandoverRoute()
=======
    new ProductRoute()
>>>>>>> 1858c79e9ea655e0631aad47a71ad92f15f0e3af
];

export default router;
