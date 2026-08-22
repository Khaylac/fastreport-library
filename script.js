let selectedCategory = "All";

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


function getFilteredReports() {

    return reports.filter(function(report) {

        const matchesCategory =
            selectedCategory === "All" ||
            report.category === selectedCategory;


        const searchableText =

            report.name +
            " " +
            report.description +
            " " +
            report.category;


        const matchesSearch =

            searchableText
                .toLowerCase()
                .includes(
                    searchText.toLowerCase()
                );


        return (
            matchesCategory &&
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


function createCategoryFilters() {

    const filterContainer =
        document.getElementById("category-filters");


    const categories =
        [
            "All",
            ...new Set(
                reports.map(function(report) {

                    return report.category;

                })
            )
        ];


    categories.forEach(function(category) {

        const button =
            document.createElement("button");


        button.textContent =
            category;


        button.className =
            "category-button";


        if (category === selectedCategory) {

            button.classList.add("active");

        }


        button.addEventListener(
            "click",
            function() {

                selectedCategory =
                    category;


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

    createCategoryFilters();

    setupSearch();

    renderReports();

}


initializeLibrary();
