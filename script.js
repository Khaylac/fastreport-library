let selectedScreen = "Todos";

let searchText = "";


function createReportCard(report) {

    const previewImage =
        report.images.length > 0
            ? report.images[0]
            : "";


    return `

        <div class="report-card">

            <div class="report-preview">

                <img
                    src="reports/${report.folder}/${previewImage}"
                    alt="${report.name} Preview"
                >

            </div>


            <div class="report-content">

                <div class="report-meta">

                    ${
                        report.screen
                            ? `
                                <span class="screen">
                                    ${report.screen}
                                </span>
                            `
                            : ""
                    }


                    ${
                        report.type
                            ? `
                                <span class="type">
                                    ${report.type}
                                </span>
                            `
                            : ""
                    }


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
                    Atualizado em: ${report.updated}
                </div>


                <div class="buttons">

                    <a
                        href="report.html?id=${report.id}"
                        class="button button-details"
                    >
                        Ver Detalhes
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


function getFilteredReports() {

    return reports.filter(function(report) {

        const matchesScreen =
            selectedScreen === "Todos" ||
            report.screen === selectedScreen;


        const searchableText =

            report.name +
            " " +
            report.description +
            " " +
            (report.screen || "") +
            " " +
            (report.type || "");


        const matchesSearch =

            searchableText
                .toLowerCase()
                .includes(
                    searchText.toLowerCase()
                );


        return (
            matchesScreen &&
            matchesSearch
        );

    });

}


function renderReports() {

    const reportGrid =
        document.getElementById("report-grid");


    const noResults =
        document.getElementById("no-results");


    const filteredReports =
        getFilteredReports();


    reportGrid.innerHTML = "";


    filteredReports.forEach(function(report) {

        reportGrid.innerHTML +=
            createReportCard(report);

    });


    if (filteredReports.length === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


function createScreenFilters() {

    const filterContainer =
        document.getElementById("category-filters");


    const screens =

        reports
            .map(function(report) {

                return report.screen;

            })
            .filter(function(screen) {

                return screen !== null;

            });


    const uniqueScreens =

        [
            "Todos",
            ...new Set(screens)
        ];


    uniqueScreens.forEach(function(screen) {

        const button =
            document.createElement("button");


        button.textContent =
            screen;


        button.className =
            "category-button";


        if (screen === selectedScreen) {

            button.classList.add("active");

        }


        button.addEventListener(
            "click",
            function() {

                selectedScreen =
                    screen;


                document
                    .querySelectorAll(
                        ".category-button"
                    )
                    .forEach(function(button) {

                        button.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                renderReports();

            }
        );


        filterContainer.appendChild(
            button
        );

    });

}


function setupSearch() {

    const searchInput =
        document.getElementById("search-input");


    searchInput.addEventListener(
        "input",
        function() {

            searchText =
                searchInput.value;


            renderReports();

        }
    );

}


function initializeLibrary() {

    createScreenFilters();

    setupSearch();

    renderReports();

}


initializeLibrary();
