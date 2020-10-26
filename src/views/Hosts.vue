<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 py-8 sm:px-0">
    <div class="pb-5 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Hosts
      </h3>
    </div>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        <li v-for="host in hosts" :key="host.ip" >
          <a :href="`/hosts/${host.nmaprun.host.address['@addr']}`" class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                </div>
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <div class="text-sm leading-5 font-medium text-indigo-600 truncate">{{ host.nmaprun.host.address['@addr'] }}</div>
                      <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                        <span class="truncate">{{ host.nmaprun.host.ports.port.length }} ports</span>
                      </div>
                    </div>
                    <div class="hidden md:block">
                      <div>
                        <div class="text-sm leading-5 text-gray-900">
                          Scanned on
                          <time datetime="2020-01-07">{{ moment.unix(host.nmaprun.host['@starttime']).format("DD MMMM YYYY") }}</time>
                        </div>
                        <div class="mt-2 flex items-center text-sm leading-5 text-gray-500" v-if="host.nmaprun.runstats.finished['@exit'] === 'success'">
                          <!-- Heroicon name: check-circle -->
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          Completed scan
                        </div>
                        <div class="mt-2 flex items-center text-sm leading-5 text-gray-500" v-else>
                          <!-- Heroicon name: check-circle -->
                          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Scan failed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div>
                <!-- Heroicon name: chevron-right -->
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'hosts',
  data() {
    return {
      moment,
    };
  },
  // created() {
  //   const hosts = require.context(
  //     '@/../public/scans',
  //     true,
  //     /^.*\.xml$/,
  //   );
  //   this.hosts = hosts.keys().map((host) => ({ ip: host.split('./')[1].split('.xml')[0] }));
  // },
  computed: {
    ...mapState(['hosts']),
  },
};
</script>
