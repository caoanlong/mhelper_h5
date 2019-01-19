<template>
	<a
		class="ly-tab-item"
		:style="$parent.value === id ? activeStyle : {}"
		@click="onItemClicked">
		<div class="ly-tab-item-label"><slot></slot></div>
		<div class="ly-tab-active-bar"
			v-if="$parent.value === id"
			:style="activeBarStyle"
			ref="activeBar">
		</div>
	</a>
</template>

<script>
export default {
	name: 'LyTabItem',
	props: {
		id: Number
	},
	computed: {
		activeStyle () {
		return {
			color: this.$parent.activeColor
		}
		},
		activeBarStyle () {
		return {
			width: `${this.$parent.activeBarWidth}px`,
			height: `${this.$parent.lineWidth}px`,
			backgroundColor: this.$parent.activeColor,
			borderRadius: '4px'
		}
		}
	},
	data () {
		return {
		// id: (this.$parent.$children.length || 1) - 1
		}
	},
	methods: {
		onItemClicked () {
		this.$parent.$emit('input', this.id)
		},
	}
}
</script>

<style>
.ly-tab-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	text-align: center;
}

.ly-tab-item-icon {
	margin: 0 auto 5px;
}
</style>
