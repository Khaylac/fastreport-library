function createReportCard(report) {

    const preview = `
        <img
            src="reports/${report.folder}/preview.png"
            alt="${report.name} Preview"
        >
    `;


    return `

        <div class="report-card">

            <div class="report-preview">

                ${preview}

            </div>


            <div class="report-content">

                <div class="report-meta">

                    <span class="category">
                        ${report.category.toUpperCase()}
                    </span>

                    <span class="version">
                        v${report.version}
                    </span>

                </div>


                <h3>
                    ${report.name}
                </h3>


                <p class="report-description">
                    ${report.description}
                </p>


                <div class="report-updated">
                    Updated: ${report.updated}
                </div>


                <div class="buttons">

                    <a
                        href="report.html?id=${report.id}"
                        class="button button-details"
                    >
                        View Details
                    </a>


                    <a
                        href="reports/${report.folder}/report.fr3"
                        download
                        class="button button-download"
                    >
                        Download FR3
                    </a>

                </div>

            </div>

        </div>

    `;

}


function loadReports() {

    const reportGrid =
        document.getElementById("report-grid");


    reports.forEach(function(report) {

        reportGrid.innerHTML +=
            createReportCard(report);

    });

}


loadReports();
