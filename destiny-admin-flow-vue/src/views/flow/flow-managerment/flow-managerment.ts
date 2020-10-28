import { Component, Vue, Emit, Mixins, Ref } from "vue-property-decorator";
import antg6 from "@antv/g6"
@Component({
    name: "FlowManagerment",
})
export default class FlowManagerment extends Mixins() {

    private data = {
        nodes: [
            {
                id: 'circle',
                label: 'Circle',
                x: 250,
                y: 150,
            },
        ],
    };
    private width: number = 800;
    private height: number = 800;
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
            container: 'container',
            width: 800,
            height: 1920,
            // translate the graph to align the canvas's center, support by v3.5.1
            fitCenter: true,
            defaultNode: {
                type: 'circle',
                size: [160],
                color: '#5B8FF9',
                style: {
                    fill: '#9EC9FF',
                    lineWidth: 3,
                },
                labelCfg: {
                    style: {
                        fill: '#1890ff',
                        fontSize: 24,
                    },
                    position: 'bottom',
                },
                // configurations for four linkpoints
                linkPoints: {
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                    // the diameter of the linkPoint
                    size: 10,
                    lineWidth: 1,
                    fill: '#fff',
                    stroke: '#1890FF',
                },
                // icon configuration
                icon: {
                    // whether show the icon
                    show: true,
                    // icon's img address, string type
                    img:
                        'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                    width: 60,
                    height: 60,
                },
            },
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
            nodeStateStyles: {
                // node style of hover state
                hover: {
                    fillOpacity: 0.8,
                },
                // node style of selected state
                selected: {
                    lineWidth: 5,
                },
            },
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