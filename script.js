function createReportCard(report) {

    const preview = `
        <img
            src="reports/${report.folder}/preview.png"
            alt="${report.name} Preview"
        >
    `;


    const buttons = `
        <div class="buttons">

            <a
                href="reports/${report.folder}/example.pdf"
                target="_blank"
                class="button button-preview"
            >
                Preview
            </a>

            <a
                href="reports/${report.folder}/report.fr3"
                download
                class="button button-download"
            >
                Download FR3
            </a>

        </div>
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


                ${buttons}

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
