import MainRoute from '../bases/route.abstract';
import BasicRoute from './basic.route';
import StoreRoute from './store.route';
import UserRoute from './user.route';
import HandoverRoute from './handover.route';

// collect all the routes
const router: Array<MainRoute> = [new BasicRoute(), new StoreRoute(), new UserRoute(), new HandoverRoute()];

export default router;
