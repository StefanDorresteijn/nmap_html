<template>
  <div>
    <h1>Let's take a look at your hosts</h1>
    <table class="flex border rounded table table-auto">
      <thead class="border-b">
        <th class="border-r">IP</th>
      </thead>
      <tbody>
        <tr v-for="host in hosts" :key="host.ip" class="border-b">
          <td class="border-r"><a :href="`/hosts/${host.ip}`">{{ host.ip }}</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'hosts',
  data() {
    return {
      hosts: [],
    };
  },
  created() {
    const hosts = require.context(
      '@/../public/scans',
      true,
      /^.*\.xml$/,
    );
    this.hosts = hosts.keys().map((host) => ({ ip: host.split('./')[1].split('.xml')[0] }));
  },
};
</script>
