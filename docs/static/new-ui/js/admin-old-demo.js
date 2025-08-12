const apiPrefix = '../admin_api/common/app';

new Vue({
    el: '#vue',
    data: {
        mapList: [],
        create: {},
        isShowCreate: false,
        editingId: 0
    },
    mounted() {
        aj.xhr.get(apiPrefix + '/list', json => {
            this.mapList = json.data;
        }, {
            header: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    },
    methods: {
        doCreate() {
            let url = "../admin_api/common/objectType/create";

            form("POST", url, convertKeysToUnderscore(this.create), (json) => {
                console.log(json);
                if (json && json.status == 1) {
                    alert('创建成功');
                    location.reload();
                }

            }, {
                header: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        },
        del(id) {
            if (confirm('确定删除？')) {
                let url = "../admin_api/common/objectType/delete/" + id;
                aj.xhr.postForm(url, {}, (json) => {
                    if (json && json.status == 1) {
                        alert('删除成功');
                        location.reload();
                    }
                }, {
                    header: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
            }
        },
        save(entity) {
            let url = "../admin_api/common/objectType/update";
            let _e = convertKeysToUnderscore(entity);
            let e = {
                object_type_id: _e.object_type_id,
                combat_party: _e.combat_party,
                obj_type_name: _e.obj_type_name,
                obj_group: _e.obj_group,
                obj_type: _e.obj_type,
                obj_type_img: _e.obj_type_img,
                obj_type_num: _e.obj_type_num
            };

            aj.xhr.postForm(url, e, (json) => {
                console.log(json);
                if (json && json.status == 1) {
                    alert('修改成功');
                    location.reload();
                }

            }, {
                header: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        }
    }
});