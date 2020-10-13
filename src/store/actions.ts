import { ActionTree } from "vuex";
import jwt_decode from "jwt-decode";
import { asyncRouterMap } from "../router"

const actions: ActionTree<any,any> = {
	async setUser({ state ,commit},user:any){
		const decoded = jwt_decode(user);
		commit("SET_USER",decoded);

		const { key } = decoded;
		// 返回当前用户拥有的路由权限
		filterAsyncRouter(asyncRouterMap, key);
	}
};

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 所有路由表
 * @param roles 当前角色
 */

function filterAsyncRouter(){
	
}


export default actions;
