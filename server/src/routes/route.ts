import MainRoute from "../bases/route.abstract";
import BasicRoute from "./basic.route";
// collect all the routes
const router: Array<MainRoute> = [new BasicRoute()];

export default router;
