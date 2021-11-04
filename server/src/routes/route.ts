import MainRoute from "../bases/route.abstract";
import BasicRoute from "./basic.route";
import StoreRoute from "./store.route";

// collect all the routes
const router: Array<MainRoute> = [
    new BasicRoute(),
    new StoreRoute(),
];

export default router;
