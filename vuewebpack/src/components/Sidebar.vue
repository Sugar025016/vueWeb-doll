<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>管理員</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link to="/dashboard/products" class="nav-link">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  <i class="fas fa-box-open"></i>
                  產品列表
                </a>
                </router-link>
              </li>
              
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>模擬功能</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                
                <router-link to="/custom" class="nav-link">
                <a class="nav-link" href="#">

                <i class="fas fa-binoculars"></i>
                  <span data-feather="file-text"></span>
                  模擬
                </a></router-link>
              </li>
              
            </ul>
          </div>
        </nav>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>