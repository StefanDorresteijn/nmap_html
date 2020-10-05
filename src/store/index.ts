import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hosts: [],
  },
  mutations: {
    setHosts(state, hosts) {
      state.hosts = hosts;
    },
    setHost(state, host) {
      const foundHost = state.hosts.find((localHost) => localHost?.nmaprun?.host?.address['@addr'] === host.nmaprun.host.address['@addr']);
      if (!foundHost) {
        const tempHosts = state.hosts;
        tempHosts.push(host);
        state.hosts = tempHosts;
      } else {
        const index = state.hosts.indexOf(foundHost);
        state.hosts[index] = host;
      }
    },
    togglePort(state, portInfo) {
      const [host, port] = portInfo.split('_');
      const foundHost = state.hosts.find((localHost) => localHost?.nmaprun?.host?.address['@addr'] === host);
      if (!foundHost) return;
      const hostIndex = state.hosts.indexOf(foundHost);

      const foundPort = foundHost.nmaprun.host.ports.port.find(
        (localPort) => localPort['@portid'] === port,
      );

      const portIndex = foundHost.nmaprun.host.ports.port.indexOf(foundPort);

      foundHost.nmaprun.host.ports.port[portIndex].checked = Object.keys(
        foundHost.nmaprun.host.ports.port[portIndex],
      ).indexOf('checked') > 0 ? !foundHost.nmaprun.host.ports.port[portIndex].checked : true;

      state.hosts[hostIndex] = foundHost;
    },
    setHostComment(state, { host, comment }) {
      const foundHost = state.hosts.find((localHost) => localHost?.nmaprun?.host?.address['@addr'] === host.nmaprun.host.address['@addr']);
      if (!foundHost) return;

      const hostIndex = state.hosts.indexOf(foundHost);
      foundHost.comment = comment;
      state.hosts[hostIndex] = foundHost;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    hostByIP: (state) => (ip) => state.hosts.find((host) => host?.nmaprun?.host?.address['@addr'] === ip),
  },
  plugins: [vuexLocal.plugin],
});
