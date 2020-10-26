<template>
  <!-- <div class="container mx-auto" id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |

    </div>
    <router-view/>
  </div> -->
    <div class="min-h-screen bg-white">
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <p>Ports</p>
            </div>
            <div class="hidden sm:-my-px sm:ml-6 space-x-8 sm:flex">
              <router-link to="/" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">Home</router-link>
              <router-link to="/hosts" class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">Hosts</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-link-active {
  border-color: indigo !important;
  color: black !important;
}
</style>
