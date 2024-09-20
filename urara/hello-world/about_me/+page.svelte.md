---
title: 'About Me!'
image: '/hello-world/kita-ikuyo.jpg'
alt: 'Shellkai Huang'
created: 2024-09-14
updated: 2024-09-14
---
<script lang="ts">
  
import Profile from '$lib/components/extra/profile.svelte';
// pnpm install svelte-vertical-timeline
import {
	Timeline,
	TimelineItem,
	TimelineSeparator,
	TimelineDot,
	TimelineConnector,
	TimelineContent,
	TimelineOppositeContent
  } from 'svelte-vertical-timeline';
  const options = [
	{ title: '第 53 屆全國技能競賽分區北區賽 39 資訊與網路技術 佳作', time: '2023' },
	{ title: '桃園國際新創機器人節 (TIRT) T1 智能賽車組 & 機器人划龍舟組', time: '2023' },
	{ title: '第 54 屆全國技能競賽分區北區賽 39 資訊與網路技術 金牌 (第一名)', time: '2024' },
	{ title: '第 54 屆全國技能競賽全國賽 39 資訊與網路技術 銅牌 (第三名)', time: '2024' }
	];
</script>

## 關於我

<Profile subname="ShellkaiTW" bio={`「每一次的嘗試，皆是在未知中探索著，且學習著。」`} >

<div class="flex flex-col md:flex-row gap-4 mt-4">
<a href="https://bit.ly/shellkai" rel="noopener external" target="_blank" class="group flex-1 relative overflow-hidden btn btn-block normal-case border-none no-underline bg-[#5865f2] hover:bg-[#7983f5]">
  <span class="i-simple-icons-discord absolute w-16 h-16 right-10 opacity-20 fill-white transform-gpu transition-transform ease-in-out duration-500 group-hover:scale-125" />
  <span class="z-10 !text-white">My own server: i realized here's mod is shellkai</span>
</a>
</div>
</Profile>

## Contestant memories
<Timeline position="alternate">
	{#each options as option}
		<TimelineItem>
			<TimelineOppositeContent slot="opposite-content">
				<p>{option.time}</p>
			</TimelineOppositeContent>
			<TimelineSeparator>
				<TimelineDot style={'background-color: #7CD5E2;'}/>
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent>
				<h3>{option.title}</h3>
			</TimelineContent>
		</TimelineItem>
	{/each}
</Timeline>