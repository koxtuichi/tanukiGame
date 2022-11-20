import React from "../jsx-dom-shim";
import { CSSProperties } from "jsx-dom";

const STANDARD_VALUE = 50;
const COLUMN_WIDTH = 20;
const JUDGE_POINT = 5;

const chart = (): CSSProperties => ({
	width: "500px",
	height: "297px",
	background: "black",
	border: "1px solid #FFF",
	overflow: "hidden",
})

const downBorder = (borderLeftWidth=0, borderTopWidth=0, translateY=0): CSSProperties => ({
	width: "0px",
  height: "340px",
  borderStyle: "solid",
  borderColor: "black black black #ffcc66",
	borderRightWidth: 0 + "px",
	borderLeftWidth: (borderLeftWidth + 0.5) + "px",
	borderTopWidth: borderTopWidth + "px",
	transform: `translateY(${translateY}px)`,
	marginTop: 100,
	marginRight: "-0.5px",
})

const upBorder = (borderRightWidth=0, borderTopWidth=0, translateY=0): CSSProperties => ({
	width: "0px",
  height: "340px",
  borderStyle: "solid",
  borderColor: "black #ffcc66 black black",
	borderLeftWidth: 0 + "px",
	borderRightWidth: (borderRightWidth + 0.5) + "px",
	borderTopWidth: borderTopWidth + "px",
	transform: `translateY(${translateY}px)`,
	marginTop: 100,
	marginRight: "-0.5px",
})

const dashedBorder = (height=0): CSSProperties => ({
	border: 100 < height ? "1px dashed red" : "1px dashed green",
	position: "absolute",
	top: STANDARD_VALUE+height+"px",//基準値	差分
	width: "498px",
})

const startBorder = (width: number): CSSProperties => ({
	border: "1px solid white",
	position: "absolute",
	top: "1px",
	left: width + "px",
	height: "296px",
})

const endBorder = (width: number): CSSProperties => ({
	border: "1px solid white",
	position: "absolute",
	top: "1px",
	left: width + "px",
	height: "296px",
})

const judgmentBackground = (startWidth: number, endWidth: number, over100: boolean = false): CSSProperties => ({
	position: "absolute",
	top: "1px",
	left: startWidth + "px",
	width: endWidth - startWidth + "px",
	background: over100 ? "rgba(255,0,0,0.2)" : "rgba(0,255,0,0.2)",
	height: "298px",
})

type BOChartProps = {
	data: {
		type: "up" | "down";
		value: number;
	}[],
	start?: number;	
}

const BOChart = ({ data, start }: BOChartProps) => {
	let total = 0;
	let sumValue = 0;
	data.filter(d => d.type === "down").map(d => sumValue += d.value);
	data.filter(d => d.type === "up").map(d => sumValue -= d.value);
	return (
		<div style={chart()}>
			<div style={{ transform: `translateY(${STANDARD_VALUE}px)`, display: "flex" }}>
				{data.map((d, i) => {
					const prevTotal = total;
					if (d.type === "down") {
						total += d.value;
						return (
							<div style={downBorder(COLUMN_WIDTH, d.value, prevTotal)} />
						);
					} else if (d.type === "up") {
						total -= d.value;
						return (
							<div style={upBorder(COLUMN_WIDTH, d.value, total)} />
						);
					}
				})}
			</div>
			<div style={dashedBorder(sumValue + 100)}></div>
			{start && (
				<>
				<div style={startBorder(start*COLUMN_WIDTH)} />
				<div style={endBorder((start+JUDGE_POINT)*COLUMN_WIDTH)} />
				{100 < (sumValue + 100) && (
					<div style={judgmentBackground(start*COLUMN_WIDTH, (start+JUDGE_POINT)*COLUMN_WIDTH, true)} />
				)}
				{(sumValue + 100) <= 100 && (
					<div style={judgmentBackground(start*COLUMN_WIDTH, (start+JUDGE_POINT)*COLUMN_WIDTH, false)} />
				)}
				</>
			)}
		</div>
	);
}

export default BOChart;
