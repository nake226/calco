'use strict';
var vm = new Vue({
  // 結合する要素
  el: '#app',
  // データ
  data: {
    name: "",
    buy: "",
    sell: "",
    todos: [],
  },
  // 監視
  watch: {
    /**
     * @name todos
     * タスクの内部（プロパティ / 値）も監視する
     */
    todos: {
      handler: function(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  // データがマウントされた直後
  mounted: function(){
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  },
  // 関数
  methods: {
    // 売買を記録する
    addItem(){
      if (this.name.length === 0) {
        return;
      }
      var item = {
        name: this.name,
        buy: this.buy,
        sell: this.sell
      }
      this.todos.push(item); 
      // todoの追加後に入力欄を空にする
      this.name = "";
    },
    // タスク削除
    deleteItem(index){
      if (!confirm("記録を削除しますか？")) {
        return
      }
      this.todos.splice(index, 1);
    },
  },
  // 算出プロパティ
  computed: {
    /**
     * @name remaining
     * @returns 残りのタスク
     */
    remaining: function(){
      return this.todos.filter(function(todo){
        return !todo.is_done;
      });
    }
  }
});
