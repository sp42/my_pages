var apiPrefix3 = '';
// VS Code 高亮 HTML 用
var html = String;

Vue.component('admintable-date-column', {
  template: html`<span>{{item[dateField].slice(0, -3)}}</span>`,
  props: {
    item: { type: Object, required: true },
    dateField: { type: String, required: false, default: 'createDate' },
  }
});

Vue.component('admintable-date-edit-btns', {
  template: html`<span>
      <a href="#" @click="$parent.del(item.id)" v-show="data.editingId != item.id"><span style="color:red">✖</span>
        删除</a>
    <a href="#" @click="$parent.save(item)" v-show="data.editingId == item.id"><span style="color:green">✔</span>
        保存</a>
    |
    <a href="#" @click="data.editingId = item.id" v-show="data.editingId != item.id">编辑</a>
    <a href="#" @click="data.editingId = 0" v-show="data.editingId == item.id"> 取消</a>
  </span>`,
  props: {
    item: { type: Object, required: true },
    data: { type: Object, required: true },
  },
  methods: {
    test() {
      debugger
    }
  }
});

Vue.component('admintable', {
  template: html`
  <div>
      <div class="btns" align="right">
        <a v-if="!disableCreate" href="#" @click="data.isShowCreate = true"><span style="color:green">➕</span> 添加</a>
      </div>
      <table class="list-table">
        <slot :list="list" :data="data">grfgf</slot>
      </table>
      <div class="pagination">
          <!-- Display paginated data -->
          <a @click="prevPage" :class="{ disabled: page.currentPage === 1 }" href="javascript:void(0)">&laquo;</a>
          <a v-for="p in totalPages" :key="p" @click="goToPage(p)" :class="{ active: p === page.currentPage }"
              href="javascript:void(0)">
              {{ p }}
          </a>
          <a @click="nextPage" :class="{ disabled: page.currentPage === totalPages }" href="javascript:void(0)">&raquo;</a>
          <span class="text">第 {{ page.currentPage }} 页，共 {{ totalPages }} 页，共 {{page.totalCount}} 条数据</span>
      </div>
  </div>`,
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    disableCreate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],

      data: {
        isShowCreate: false,
        editingId: 0,
        STAT: {
          0: '正常',
          1: '已禁用',
          2: '已删除'
        },
        create: {},
      },
      page: {
        pageSize: 10, // Number of items per page
        totalCount: 0,
        currentPage: 1,
      }
    }
  },
  computed: {
    start() {// Calculate MySQL-style START (offset)
      return (this.page.currentPage - 1) * this.page.pageSize;
    },
    totalPages() {// Calculate total pages
      return Math.ceil(this.page.totalCount / this.page.pageSize);
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      aj.xhr.get(`${this.apiUrl}/page?start=${this.start}&limit=${this.page.pageSize}`, json => {
        this.list = json.data.list;
        this.page.totalCount = json.data.totalCount;
      }, {
        header: {
          // Authorization: 'Bearer ' + accessToken,
          // 'auth-tenant-id': localStorage.getItem('tenantId') || ''
        }
      });
    },
    // Go to previous page
    prevPage() {
      if (this.page.currentPage > 1) {
        this.page.currentPage--;
        this.fetchData();
      }
    },
    // Go to next page
    nextPage() {
      if (this.page.currentPage < this.totalPages) {
        this.page.currentPage++;
        this.fetchData();
      }
    },
    // Optional: Go to specific page
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.page.currentPage = page;
        this.fetchData();
      }
    },
    doCreate() {
      form("POST", this.apiUrl, convertKeysToUnderscore(this.data.create), (json) => {
        console.log(json);
        if (json && json.status == 1) {
          alert('创建成功');
          location.reload();
        }
      }, {
        header: {
          // Authorization: 'Bearer ' + accessToken
        }
      });
    },
    del(id) {
      if (confirm('确定删除？')) {
        aj.xhr.del(this.apiUrl + '/' + id, (json) => {
          if (json && json.status == 1) {
            alert('删除成功');
            location.reload();
          }
        }, {
          header: {
            // Authorization: 'Bearer ' + accessToken
          }
        });
      }
    },
    save(entity) {
      let data = convertKeysToUnderscore(entity);

      aj.xhr.putForm(this.apiUrl, data, (json) => {
        console.log(json);
        if (json && json.status == 1) {
          alert('修改成功');
          location.reload();
        }
      }, {
        header: {
          // Authorization: 'Bearer ' + accessToken
        }
      });
    }
  }
});