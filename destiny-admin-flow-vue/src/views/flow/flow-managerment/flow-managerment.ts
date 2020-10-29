import { Component, Vue, Emit, Mixins, Ref } from "vue-property-decorator";
import FlowStart from "@/components/flow-component/flow-start/flow-start.vue"
import antg6 from "@antv/g6"
@Component({
    name: "FlowManagerment",
    components: {
        FlowStart
    }
})
export default class FlowManagerment extends Mixins() {
    private visualcanvasdata = {
        nodes: [
            {
                id: '123456645616',
                type: 'circle',
                label: '开始节点',
                // img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
                x: 30,
                y: 25,
                size: 20,
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
                        'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
                    width: 60,
                    height: 60,
                },
            },
            {
                id: '1234566sdfasd45616',
                type: 'circle',
                label: '开始节点',
                // img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
                x: 80,
                y: 90,
                size: 20,
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
                        'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
                    width: 60,
                    height: 60,
                },
            }
        ],
        edges: [

        ],
    };

    private graph: any;


    private created() {

    }
    private mounted() {
        this.InitGraph()
    }
    public InitGraph() {
        const width = document.getElementById("visualcanvasparent")?.scrollWidth || 1200;
        const height = document.getElementById('visualcanvasparent')?.scrollHeight || 500;
        console.log(width, height)
        const grid = new antg6.Grid();
        /**
         * 自定是事件暂时有问题
         */
        // antg6.registerBehavior("activate-node", {
        //     getDefaultCfg() {
        //         return {
        //             multiple: true
        //         };
        //     },
        //     getEvents() {
        //         return {
        //             'node:click': 'onNodeClick',
        //         };
        //     }
        // })
        /**
         * 定义工具栏
         */
        const toolbar = new antg6.ToolBar();
        /**
         * 缩略图
         */
        const minimap = new antg6.Minimap(
            {
                size: [100, 100],
            });
        this.graph = new antg6.Graph({
            container: 'visualcanvas',//绑定的容器div的id
            width: width,//宽
            height: height,//高
            plugins: [toolbar],//工具栏等一些工具引入
            fitCenter: false,
            fitView: true,
            fitViewPadding: 20,
            modes: {
                // 支持的 behavior
                default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
                edit: ['click-select'],
            },
        });
        console.log(this.graph);
        this.graph.data(this.visualcanvasdata);
        this.graph.render();
        this.graph.on('node:click', (evt: any) => {
            this.onNodeClick(evt)
        });

    }
    private onNodeClick(evt: any) {
        console.log(evt.item)
        console.log("asd1as1d32asd123as1d23as")
    }

}