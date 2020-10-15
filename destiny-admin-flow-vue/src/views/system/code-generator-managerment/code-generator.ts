import { Component, Emit, Mixins, Ref } from "vue-property-decorator";
import { EFilterConnect, EFilterOprator } from '@/shared/request/query.enum';

import PageMixins from '@/shared/mixins/page.mixins';

@Component({
    name: "CodeGeneratorManagerment"
})

export default class CodeGeneratorManagerment extends Mixins(PageMixins) {
    

}