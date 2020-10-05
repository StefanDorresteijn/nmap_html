<template>
  <div class="hostWrapper">
    <div class="row">
      <div class="rounded overflow-hidden card">
        <p class="text-gray-700 text-base">
          {{ scanType }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="rounded overflow-hidden card">
        <div class="font-bold text-xl mb-2">Runtime</div>
        <p class="text-gray-700 text-base">
          {{ duration }} Minutes
        </p>
      </div>
      <div class="rounded overflow-hidden card">
        <div class="font-bold text-xl mb-2">Hostname</div>
        <p class="text-gray-700 text-base">
          {{ address }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="rounded overflow-hidden flex block">
        <div class="font-bold text-xl mb-2 cardTitle">Ports</div>
        <table class="flex border rounded table table-auto">
          <thead class="border-b">
            <th class="border-r">ID</th>
            <th class="border-r">Status</th>
            <th class="border-r">Service</th>
            <th>Tested?</th>
          </thead>
          <tbody>
            <tr v-for="port in ports" :key="port.id" class="border-b">
              <td class="border-r">{{ port.id }}</td>
              <td class="border-r">{{ port.state }}</td>
              <td class="border-r">{{ port.service }}</td>
              <td>
                <input
                  type="checkbox"
                  class="form-radio"
                  @change="handleToggle"
                  :checked="port.checked"
                  :id="port.id"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="font-bold text-xl mb-2 cardTitle">Comments</div>
      <textarea id="commentSection" class="rounded" v-model="host.comment" />
    </div>
  </div>
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
      return this.host.nmaprun['@args'];
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
    border: 1px solid #e2e8f0;
    outline: none;
    resize: none;
    overflow: auto;
    width: 100%;
    min-height: 250px;
  }
</style>
