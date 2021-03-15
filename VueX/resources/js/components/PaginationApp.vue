<template>
    <div class="card-footer pb-0 pt-3" align="center">
        <jw-pagination :items="cloneListCustomer" @changePage="onChangePage"></jw-pagination>
    </div>
</template>

<script>
import {EventBus} from "../app.js";

const exampleItems = [...Array(150).keys()].map(i => ({id: (i + 1), name: 'Item ' + (i + 1)}));
const customStyles = {
    ul: {
        border: '2px solid red'
    },
    li: {
        display: 'inline-block',
        border: '2px dotted green'
    },
    a: {
        color: 'blue'
    }
};
const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};
export default {
    data() {
        return {
            exampleItems,
            pageOfItems: [],
            customStyles,
            customLabels
        };
    },
    methods: {
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
            console.log(this.pageOfItems);
            EventBus.$emit("paginations", {
                listCustomer: pageOfItems
            });
        }
    },
    props: ['cloneListCustomer']
};
</script>
<style scoped>
</style>
