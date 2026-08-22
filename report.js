function getReportId() {

    const parameters =
        new URLSearchParams(window.location.search);

    return parameters.get("id");

}


function findReport(id) {

    return reports.find(function(report) {

        return report.id === id;

    });

}


function createList(items) {

    let html = "<ul>";

    items.forEach(function(item) {

        html += `
            <li>${item}</li>
        `;

    });

    html += "</ul>";

    return html;

}


function loadReport() {

    const reportId =
        getReportId();

    const report =
        findReport(reportId);

    const container =
        document.getElementById("report-details");


    if (!report) {

        container.innerHTML = `

            <h1>
                Report not found
            </h1>

            <p>
                The report you are looking for does not exist.
            </p>

        `;

        return;

    }


    document.title =
        report.name + " - FastReport Library";


    container.innerHTML = `

        <section class="report-header">

            <div class="report-header-info">

                <div class="report-meta">

                    <span class="category">
                        ${report.category.toUpperCase()}
                    </span>

                    <span class="version">
                        v${report.version}
                    </span>

                </div>


                <h1>
                    ${report.name}
                </h1>


                <p class="report-full-description">
                    ${report.description}
                </p>


                <div class="report-updated">

                    Updated: ${report.updated}

                </div>


                <div class="buttons">

                    <a
                        href="reports/${report.folder}/example.pdf"
                        target="_blank"
                        class="button button-preview"
                    >
                        Preview PDF
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


            <div class="report-large-preview">

                <img
                    src="reports/${report.folder}/preview.png"
                    alt="${report.name} Preview"
                >

            </div>

        </section>


        <section class="report-details-grid">


            <div class="report-details-section">

                <h2>
                    Features
                </h2>

                ${createList(report.features)}

            </div>


            <div class="report-details-section">

                <h2>
                    Requirements
                </h2>

                ${createList(report.requirements)}

            </div>


            <div class="report-details-section">

                <h2>
                    Parameters
                </h2>

                ${createList(report.parameters)}

            </div>


        </section>

    `;

}


loadReport();
