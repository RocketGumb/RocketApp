import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";

class Charts extends Component {
	render() {
		const data = {
			labels: ["January", "February"],
			datasets: [
				{
					backgroundColor: ["#796AEE", "#FF7676", "#54E69D", "#FFC36D"],
					data: [4, 10, 5, 14]
				}
			]
		};
		Chart.defaults.global.defaultFontFamily = "'Montserrat', arial, sans-serif";
		const options = {
			legend: {
				display: false
			}
		};
		return (
			<div>
				<div className="pagetitle">Задачи</div>
				<section className="content_main">
					<div style={{ width: "200px" }}>
						<Pie options={options} data={data} />
					</div>
				</section>
			</div>
		);
	}
}

export default Charts;
