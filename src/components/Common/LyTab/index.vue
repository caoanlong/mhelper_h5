<template>
	<div class="ly-tab">
	<ly-tabbar
		v-model="selectedId"
		v-bind="options">
		<ly-tab-item 
			:id="index"
			v-for="(item, index) in items"
			:key="index">
			<span v-if="options.fixBottom && item.icon" slot="icon">
				<i :class="item.icon"></i>
			</span>
			<img v-if="isImg" style="width: 80px" :src="IMGURL + 'LOGO-' + item[labelKey] + '.png'"/>
			<span v-else>{{ item[labelKey] }}</span>
		</ly-tab-item>
	</ly-tabbar>
	</div>
</template>

<script>
import LyTabbar from './Tabbar'
import LyTabItem from './TabItem'

export default {
	name: 'LyTab',
	components: {
		LyTabbar,
		LyTabItem
	},
	props: {
		value: {
			type: Number,
			default: 0
		},
		items: {
			type: Array,
			default: () => []
		},
		isImg: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			selectedId: this.value
		}
	},
	computed: {
		labelKey () {
			return this.options.labelKey || 'label'
		}
	},
	watch: {
		value (value) {
			this.selectedId = value
		},
		selectedId (value) {
			this.$emit('input', value)
			this.$emit('change', this.items[value], value)
		}
	}
}
</script>

<style>

</style>
