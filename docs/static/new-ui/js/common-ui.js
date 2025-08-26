Vue.component('aj-layer', {
    template: html`<div class="modal-mask">
      <div class="modal-container">
        <!-- 弹出层内容 -->
        <slot></slot>
      </div>
  </div>`
});

Vue.component('aj-confirm', {
    template: html`<div class="modal-mask">
	      <div class="modal-container comfirm">
	        	<h2>{{ title }}</h2>
		        <p>{{ message }}</p>
		        <div class="confirm-buttons">
		          <button @click="confirm">确定</button>
		          <button @click="cancel">取消</button>
		        </div>
	        </div>
	      </div>
	  </div>`,
    props: {
        title: {
            type: String,
            default: '确认'
        },
        message: {
            type: String,
            default: '确定执行此操作吗？'
        },
        confirmHandler: { // 执行函数名称
            type: Function
        },
        state: { // 执行函数名称
            type: String
        }
    },
    data() {
        return {
            isShow: false
        };
    },
    methods: {
        confirm() {
            if (this.confirmHandler)
                this.confirmHandler();
            else
                this.$parent.confirm();

            this.cancel();

        },
        cancel() {
            if (this.state)
                this.$parent[this.state] = false;
            else
                this.$parent.isShow = false;
        }
    }
});

/**
 * 轮播图（透明渐变）
 */
Vue.component('aj-carousel', {
    template: html`<div class="carousel">
    <div class="carousel-inner">
        <div class="carousel-item" v-for="(slide, index) in items" :key="index" :class="{ active: index === currentIndex }">
            <img :src="slide.image" :alt="slide.alt" />
        </div>
    </div>
    <div class="carousel-indicators">
      <button v-for="(item, index) in items" :key="index" @click="select(index)" class="carousel-indicator" :class="{ active: index === currentIndex }"></button>
    </div>
    <button class="carousel-control-prev" @click="prev">‹</button>
    <button class="carousel-control-next" @click="next">›</button>
  </div>`,
    props: {
        items: {
            type: Array,
            required: true
        },
        interval: {
            type: Number,
            default: 5000
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    watch: {
        currentIndex() {
            this.clearInterval();
            this.startInterval();
        }
    },
    mounted() {
        this.startInterval();
    },
    methods: {
        select(index) {
            this.currentIndex = index
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length
        },
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.items.length
        },
        startInterval() {
            this.intervalId = setInterval(() => {
                this.next()
            }, this.interval);
        },
        clearInterval() {
            if (this.intervalId)
                clearInterval(this.intervalId);
        }
    }
});

/**
 * 调整正文字体大小
 */
Vue.component('aj-adjust-font-size', {
    template: `<div class="aj-adjust-font-size">
    <span>字体大小</span>
    <ul @click="onClk">
      <li><label><input type="radio" name="fontSize" /> 小</label></li>
      <li><label><input type="radio" name="fontSize" /> 中</label></li>
      <li><label><input type="radio" name="fontSize" /> 大</label></li>
    </ul>
  </div>`,
    props: {
        articleTarget: { type: String, default: "article p" }, // 正文所在的位置，通过 CSS Selector 定位
    },
    methods: {
        onClk(ev) {
            let el = ev.target;
            let setFontSize = (fontSize) => {
                document.body.querySelectorAll(this.$props.articleTarget).forEach((p) => (p.style.fontSize = fontSize));
            };

            if (el.tagName == "LABEL" || el.tagName == "INPUT") {
                if (el.tagName != "LABEL") el = el.parentNode;

                if (el.innerHTML.indexOf("大") != -1) setFontSize("14pt");
                else if (el.innerHTML.indexOf("中") != -1) setFontSize("10.5pt");
                else if (el.innerHTML.indexOf("小") != -1) setFontSize("9pt");
            }
        }
    }
});

Vue.component('aj-process-line', {
    template: html`<div class="aj-process-line">
    <div class="process-line">
      <div v-for="(item, index) in items" :key="index" :class="{current: index == current, done: index < current}">
        <span>{{index + 1}}</span>
        <p>{{item}}</p>
      </div>
    </div>
  </div>`,
    props: {
        items: {
            type: Array,
            default() {
                return ["Step 1", "Step 2", "Step 3"];
            },
        },
    },
    data() {
        return {
            current: 0,
        };
    },
    methods: {
        go(i) {
            this.current = i;
        },

        perv() {
            let perv = this.current - 1;
            if (perv < 0) perv = this.items.length - 1;

            this.go(perv);
        },

        next() {
            let next = this.current + 1;
            if (this.items.length == next) next = 0; // 循环

            this.go(next);
        },
    },
});

Vue.component('aj-list', {
    template: html`<div class="aj-list">
        <table align="center">
            <thead>
                <tr>
                    <slot name="header"></slot>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in data" :key="item.id">
                    <slot :data="item"></slot>
                </tr>
            </tbody>
        </table>
     <ul class="pager">
        <li :class="{disabled: currentPage === 1}">
            <a href="###" @click="goToPreviousPage">上一页</a>
        </li>
        <li v-for="(item, index) in paginatedData" :key="index" :class="{actived: currentPage === (index + 1)}">
            <a href="###" @click="setPageNo(index + 1)">{{index + 1}}</a>
        </li>
        <li :class="{disabled: currentPage === totalPages}">
            <a href="###" @click="goToNextPage">下一页</a>
        </li>
    </ul>
    <div class="b">共{{total}}条记录，每页<input type="text" v-model="itemsPerPage" size="1" />记录，</div>
  </div>`,
    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        api: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            total: 200,
            data: [], // 从MySQL获取的所有数据
            itemsPerPage: 10, // 每页显示条目数
            currentPage: 1, // 当前页数
            start: 0,
        };
    },
    computed: {
        paginatedData() {
            if (this.itemsPerPage <= 0)
                this.itemsPerPage = 5;

            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;

            this.start = start;

            return new Array(this.totalPages);
        },
        totalPages() {
            return Math.ceil(this.total / this.itemsPerPage);
        },
    },
    methods: {
        goToPreviousPage() {
            if (this.currentPage > 1)
                // this.currentPage -= 1;
                this.setPageNo(this.currentPage - 1);
        },
        goToNextPage() {
            if (this.currentPage < this.totalPages)
                // this.currentPage += 1;
                this.setPageNo(this.currentPage + 1);

        },
        setPageNo(pageNo) {
            this.currentPage = pageNo;
            this.fetchDataFromMySQL();
        },
        fetchDataFromMySQL() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const api = this.api.indexOf('?') === -1
                ? `${this.api}?start=${start}&limit=${this.itemsPerPage}`
                : `${this.api}&start=${start}&limit=${this.itemsPerPage}`;

            aj.xhr.get(api, (j) => {
                this.data = j.data.list;
                this.total = j.data.totalCount;
            });
        },
    },
    mounted() {
        this.fetchDataFromMySQL();
    },
});

Vue.component('aj-file-upload', {
    template: html`<div class="aj-file-upload">
    <!-- 上传区域 -->
    <div v-if="!uploadedFile && !previewUrl" class="upload-area" @dragover="handleDragOver" @dragleave="handleDragLeave"
      @drop="handleDrop" :class="{ 'drag-over': isDragging }" @click="triggerFileInput"
    >
      <p>点击或拖拽文件到此处上传</p>
      <input type="file" ref="fileInput" :multiple="multiple" :accept="accept" @change="handleFileSelect" style="display: none" />
    </div>

    <!-- 图片预览（仅当是图片上传时显示） -->
    <div v-if="isImage && (previewUrl || uploadedFile)" class="image-preview">
      <img :src="previewUrl || uploadedFile" alt="预览" />
      <div class="preview-actions">
        <button class="exclude" @click="removeFile">删除</button>
        <button class="exclude" v-if="!uploadedFile" @click="triggerFileInput">更换</button>
      </div>
      <p v-if="selectedFile" class="file-size">大小: {{ formatFileSize(selectedFile.size) }}</p>
    </div>

    <!-- 已上传文件信息（非图片或未启用预览时） -->
    <div v-if="!isImage && uploadedFile" class="file-info">
      <p><strong>已上传：</strong>{{ getFileName(uploadedFile) }}</p>
      <p v-if="selectedFile" class="file-size">大小: {{ formatFileSize(selectedFile.size) }}</p>
      <button @click="removeFile">删除</button>
    </div>

    <!-- 上传按钮（如果尚未上传） -->
    <button v-if="selectedFile && !uploadedFile" @click="upload" class="exclude upload-btn">
      上传
    </button>
  </div>`,
    props: {
        // 是否切换为图片上传模式
        isImage: {
            type: Boolean,
            default: false
        },
        // 支持多文件
        multiple: {
            type: Boolean,
            default: false
        },
        // 文件类型限制（如 image/*, .pdf 等）
        accept: {
            type: String,
            default: ''
        },
        // v-model 绑定的值（上传成功后的文件路径或对象）
        value: {
            type: [String, Object, Array],
            default: null
        }
    },
    data() {
        return {
            selectedFile: null,      // 本地选中的文件
            uploadedFile: null,      // 已上传的文件（可以是 URL 或对象）
            previewUrl: '',          // 本地图片预览 URL
            isDragging: false        // 拖拽状态
        };
    },
    watch: {
        // 监听 v-model 的 value 变化（外部设置已上传文件）
        value: {
            handler(newVal) {
                this.uploadedFile = newVal;
                if (this.isImage && newVal)
                    this.previewUrl = typeof newVal === 'string' ? newVal : '';
            },
            immediate: true
        }
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleDragOver(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        handleDragLeave() {
            this.isDragging = false;
        },
        handleDrop(e) {
            e.preventDefault();
            this.isDragging = false;
            const files = e.dataTransfer.files;
            this.processFiles(files);
        },
        handleFileSelect(e) {
            const files = e.target.files;
            this.processFiles(files);
        },
        processFiles(files) {
            if (!files.length) return;

            const file = files[0]; // 单文件为主，multiple 可扩展

            // 检查是否为图片且需要预览
            if (this.isImage && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }

            this.selectedFile = file;
            this.uploadedFile = null; // 清除已上传状态
            this.$emit('input', null); // 清空 v-model
        },
        removeFile() {
            this.selectedFile = null;
            this.uploadedFile = null;
            this.previewUrl = '';
            this.$refs.fileInput.value = ''; // 清空 input
            this.$emit('input', null);
        },
        upload() {
            if (!this.selectedFile) return;

            // 这里模拟上传，实际应替换为 axios 等请求
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            // 模拟上传成功（实际使用中替换为真实请求）
            setTimeout(() => {
                const uploadedUrl = URL.createObjectURL(this.selectedFile); // 模拟返回 URL
                this.uploadedFile = uploadedUrl;
                this.$emit('input', uploadedUrl); // v-model 更新
                this.$emit('uploaded', uploadedUrl); // 触发上传完成事件
            }, 1000);
        },
        formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        getFileName(file) {
            return typeof file === 'object' ? file.name : file;
        }
    }
});