import MainRoute from "../bases/route.abstract";
import BasicRoute from "./basic.route";
import StoreRoute from "./store.route";
import TagRoute from "./tag.route";
import ProductRoute from "./product.route";


// collect all the routes
const router: Array<MainRoute> = [
    new BasicRoute(),
    new StoreRoute(),
    new TagRoute(),
    new ProductRoute()
];

export default router;
