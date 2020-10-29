import { Component, Vue, Emit, Mixins, Ref } from "vue-property-decorator";
import antg6 from "@antv/g6"
@Component({
    name: "FlowManagerment",
})
export default class FlowStart extends Mixins() {

    private data = {
        nodes: [
            {
                id: 'circle',
                type: 'image',
                label: '开始节点',
                img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
                x: 30,
                y: 25,
                size: 30,
            },
        ],
    };
    private created() {
        
    }
    /**
     * 初始化canvas必须放到mounted方法内
     */
    private mounted(){
        this.initG6()
    }
    initG6() {
        const graph = new antg6.Graph({
            container: 'start',
            width: 60,
            height: 60,
        });
        console.log(graph);
        graph.data(this.data);
        graph.render();
        // graph.on('node:mouseenter', (evt: any) => {
        //     const { item } = evt;
        //     graph.setItemState(item, 'hover', true);
        // });

        // graph.on('node:mouseleave', (evt: any) => {
        //     const { item } = evt;
        //     graph.setItemState(item, 'hover', false);
        // });

        // graph.on('node:click', (evt: any) => {
        //     const { item } = evt;
        //     graph.setItemState(item, 'selected', true);
        // });
    }
}