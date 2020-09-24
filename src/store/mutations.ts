import { MutationTree } from 'vuex';

const mutations: MutationTree<any> = {
	SET_USER(state: any, user: any): void {
		state.user = user;
	},
	SET_ROUTERS(state: any, routers: any): void {
		state.routers = routers;
	}
};

export default mutations;
