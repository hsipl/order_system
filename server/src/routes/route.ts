import MainRoute from '../bases/route.abstract';
import BasicRoute from './basic.route';
import StoreRoute from './store.route';
import UserRoute from './user.route';
import TagRoute from "./tag.route";
import HandoverRoute from './handover.route';
import ProductRoute from "./product.route";

// collect all the routes
const router: Array<MainRoute> = [
    new BasicRoute(), 
    new StoreRoute(), 
    new UserRoute(),
    new TagRoute(),
    new HandoverRoute(),
    new ProductRoute()
];

export default router;
