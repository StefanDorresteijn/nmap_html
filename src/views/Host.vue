<template>
  <main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-8 sm:px-0">
        <div class="bg-gray-50 pt-12 sm:pt-16">
          <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                Let's take a look at your host
              </h2>
              <p class="mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
                You scanned this host on {{ moment(startTime).format("DD MMMM, YYYY") }}
              </p>
            </div>
          </div>
          <div class="mt-10 pb-12 bg-white sm:pb-16">
            <div class="relative">
              <div class="absolute inset-0 h-1/2 bg-gray-50"></div>
              <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-4xl mx-auto">
                  <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                    <div class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                      <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                        IP
                      </dt>
                      <dd class="order-1 text-3xl leading-none font-extrabold text-indigo-600">
                        {{ ip }}
                      </dd>
                    </div>
                    <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                      <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500" id="item-1">
                        Runtime
                      </dt>
                      <dd class="order-1 text-3xl leading-none font-extrabold text-indigo-600" aria-describedby="item-1">
                        {{ duration }}m
                      </dd>
                    </div>
                    <div class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                      <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                        Arguments
                      </dt>
                      <dd class="order-1 text-3xl leading-none font-extrabold text-indigo-600">
                        {{ scanType }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Tested?
                        </th>
                        <th class="px-6 py-3 bg-gray-50"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="port in ports" :key="port.id"  class="bg-white">
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
                          {{ port.id }}
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-center">
                          {{ port.state }}
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-center">
                          {{ port.service }}
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-center">
                          <input
                            type="checkbox"
                            class="form-radio"
                            @change="handleToggle"
                            :checked="port.checked"
                            :id="port.id"
                          >
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <label for="commentSection" class="block text-sm font-medium leading-5 text-gray-700">Comments</label>
          <textarea id="commentSection" class="form-input block w-full sm:text-sm sm:leading-5" v-model="host.comment" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import xml2json from '@/utils/xml2json';
import parseXml from '@/utils/parseXml';
import moment from 'moment';

export default {
  name: 'hosts',
  data() {
    return {
      moment,
    };
  },
  created() {
    window.tempvar = this.host;
    if (this.host) return;

    this.axios.get(`http://localhost:8080/scans/${this.$route.params.ip}.xml`)
      .then((response) => {
        const xmlText = response.data;
        const xml = parseXml(xmlText);
        const json = xml2json(xml.children[0], '');
        this.setHost(json);
      });
  },
  methods: {
    ...mapMutations([
      'setHost',
      'togglePort',
      'setHostComment',
    ]),
    handleToggle(event) {
      const portId = event.target.id;
      this.togglePort(`${this.ip}_${portId}`);
    },
  },
  watch: {
    comment(value) {
      this.setHostComment({ host: this.host, comment: value });
    },
  },
  computed: {
    comment() {
      if (!this.host) return '';

      return this.host.comment;
    },
    host() {
      return this.$store.getters.hostByIP(this.$route.params.ip);
    },
    startTime() {
      if (!this.host) return '';
      return moment.unix(this.host.nmaprun.host['@starttime']);
    },
    endTime() {
      if (!this.host) return '';
      return moment.unix(this.host.nmaprun.host['@endtime']);
    },
    duration() {
      if (!this.host) return '';
      return moment.duration(this.endTime.diff(this.startTime)).asMinutes().toFixed(2);
    },
    address() {
      if (!this.host) return '';
      if (this.host?.nmaprun?.host?.hostnames?.hostname) {
        return this.host.nmaprun.host.hostnames.hostname['@name'];
      }
      return this.ip;
    },
    ip() {
      return this.host.nmaprun.host.address['@addr'];
    },
    ports() {
      if (!this.host) return '';
      return this.host.nmaprun.host.ports.port.map((port) => ({
        id: port['@portid'],
        state: port.state['@state'],
        service: `${port.service['@name']} - ${port.service['@product'] || ''} ${port.service['@version'] || ''} ${port.service['@extrainfo'] || ''}`,
        checked: port.checked,
      }));
    },
    scanType() {
      if (!this.host) return '';
      const fullScanType = this.host.nmaprun['@args'];
      return fullScanType.split('nmap ')[1].split('-oX')[0];
    },
  },
};
</script>

<style lang="scss">
  .row {
    margin-bottom: 30px;
  }
  .card {
    border: 1px solid #333;
    padding: 15px 45px;
    display: inline-block;
    margin-right: 15px;
    flex-direction: column;
  }
  .block {
    flex-direction: column;
  }
  .hostWrapper {
    flex-direction: row;
  }
  .table {
    thead {
      // border-bottom: 1px solid #333;
    }
  }
  #commentSection {
    outline: none;
    resize: none;
    overflow: auto;
    width: 100%;
    min-height: 250px;
  }
</style>
