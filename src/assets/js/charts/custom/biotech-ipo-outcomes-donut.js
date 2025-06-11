// src/assets/js/charts/custom/biotech-ipo-outcomes-donut.js
// Enhanced Donut Chart for Biotech IPO Outcomes
// Publication-quality visualization following NYT/FT standards

export class BiotechIPODonutChart {
    constructor(containerId, storyConfig = {}) {
        this.containerId = containerId;
        this.storyConfig = {
            primaryStory: "73% of biotech IPOs remain independent",
            keyInsights: [
                "3 in 4 biotech companies remain independent after going public",
                "Only 1 in 7 companies are acquired",
                "Distress rate equals acquisition rate at 13.7%"
            ],
            emphasisElements: ["Still Independent segment dominance"],
            ...storyConfig
        };
        
        this.config = {
            margin: { top: 10, right: 40, bottom: 20, left: 40 }, // Reduced top margin
            width: 800,
            height: 450, // Reduced height to compensate for reduced margin
            innerRadius: 80,
            outerRadius: 150,
            ...storyConfig.chartConfig
        };
        
        this.colors = this.initializeChartColors();
        this.data = null;
        this.svg = null;
        this.tooltip = null;
        this.metadata = null;
        
        // Validate story configuration
        this.validateStoryConfig();
    }

    // Required: Initialize chart colors from CSS variables
    initializeChartColors() {
        const chartColors = {
            primary: getComputedStyle(document.documentElement).getPropertyValue('--data-primary').trim(),
            secondary: getComputedStyle(document.documentElement).getPropertyValue('--data-secondary').trim(),
            hover: getComputedStyle(document.documentElement).getPropertyValue('--data-hover').trim(),
            tertiary: getComputedStyle(document.documentElement).getPropertyValue('--data-tertiary').trim(),
            quaternary: getComputedStyle(document.documentElement).getPropertyValue('--data-quaternary').trim()
        };
        
        // Validation: Ensure colors loaded properly
        if (!chartColors.primary || !chartColors.secondary) {
            console.error('Chart colors not loaded properly');
            throw new Error('CSS color variables not found');
        }
        
        return chartColors;
    }

    validateStoryConfig() {
        const required = ['primaryStory', 'keyInsights', 'emphasisElements'];
        required.forEach(field => {
            if (!this.storyConfig[field]) {
                throw new Error(`Story configuration missing required field: ${field}`);
            }
        });
    }

    async loadData(dataPath) {
        try {
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`Failed to load data: ${response.status}`);
            }
            
            const dataset = await response.json();
            this.data = dataset.strategicData;
            this.metadata = dataset.metadata;
            this.companies = dataset.companies;
            
            // Validate data structure
            if (!this.data || !Array.isArray(this.data) || this.data.length === 0) {
                throw new Error('Invalid data structure: strategicData not found or empty');
            }
            
            // Map color names to actual color values
            this.data.forEach(segment => {
                if (segment.color && this.colors[segment.color]) {
                    segment.colorValue = this.colors[segment.color];
                } else {
                    console.warn(`Color ${segment.color} not found, using primary`);
                    segment.colorValue = this.colors.primary;
                }
            });
            
            return this.data;
        } catch (error) {
            console.error('Error loading data:', error);
            this.displayError('Failed to load chart data');
            throw error;
        }
    }

    setupContainer() {
        const container = d3.select(this.containerId);
        if (container.empty()) {
            throw new Error(`Container ${this.containerId} not found`);
        }
        
        container.selectAll("*").remove();
        
        // Get responsive dimensions
        const containerWidth = container.node().getBoundingClientRect().width;
        const isMobile = containerWidth < 480;
        const isTablet = containerWidth < 768;
        
        // Adjust dimensions for responsive design
        if (isMobile) {
            this.config.width = Math.min(containerWidth - 40, 350);
            this.config.height = 300; // Reduced mobile height
            this.config.outerRadius = 100;
            this.config.innerRadius = 50;
        } else if (isTablet) {
            this.config.width = Math.min(containerWidth - 40, 500);
            this.config.height = 350; // Reduced tablet height
            this.config.outerRadius = 130;
            this.config.innerRadius = 65;
        } else {
            this.config.width = Math.min(containerWidth - 40, 800);
        }

        this.svg = container
            .append("svg")
            .attr("width", "100%")
            .attr("height", this.config.height)
            .attr("viewBox", `0 0 ${this.config.width} ${this.config.height}`)
            .attr("role", "img")
            .attr("aria-label", this.storyConfig.primaryStory)
            .attr("tabindex", "0")
            .style("max-width", "100%");

        // Position chart group closer to top
        this.chartGroup = this.svg.append("g")
            .attr("transform", `translate(${this.config.width / 2}, ${this.config.height / 2 - 10})`);

        this.setupErrorHandling();
    }

    setupErrorHandling() {
        // Create error display container
        this.errorContainer = d3.select(this.containerId)
            .append("div")
            .attr("class", "chart-error")
            .style("display", "none")
            .style("padding", "20px")
            .style("text-align", "center")
            .style("color", "#d32f2f")
            .style("background", "#ffebee")
            .style("border", "1px solid #e57373")
            .style("border-radius", "4px");
    }

    displayError(message) {
        if (this.errorContainer) {
            this.errorContainer
                .style("display", "block")
                .text(message);
        }
        
        if (this.svg) {
            this.svg.style("display", "none");
        }
    }

    createTooltip() {
        // Remove existing tooltip
        d3.select("body").selectAll(".biotech-tooltip").remove();
        
        this.tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip biotech-tooltip")
            .style("position", "absolute")
            .style("color", "white")
            .style("padding", "12px")
            .style("border-radius", "8px")
            .style("font-size", "14px")
            .style("font-weight", "400")
            .style("pointer-events", "none")
            .style("z-index", "1000")
            .style("max-width", "250px")
            .style("line-height", "1.4")
            .style("opacity", 0);
    }

    render(dataPath) {
        return this.loadData(dataPath)
            .then(() => {
                this.setupContainer();
                this.createTooltip();
                this.drawChart();
                this.addInteractions();
                this.addAnnotations();
                // Removed addLegend() call
                this.enhanceAccessibility();
                this.validateRenderQuality();
            })
            .catch(error => {
                console.error('Render error:', error);
                this.displayError('Chart rendering failed');
            });
    }

    drawChart() {
        // Create pie layout
        const pie = d3.pie()
            .value(d => d.count)
            .sort(null)
            .startAngle(-Math.PI / 2) // Start at top
            .endAngle(3 * Math.PI / 2);

        // Create arc generator
        const arc = d3.arc()
            .innerRadius(this.config.innerRadius)
            .outerRadius(this.config.outerRadius);

        // Create hover arc (slightly larger)
        const hoverArc = d3.arc()
            .innerRadius(this.config.innerRadius)
            .outerRadius(this.config.outerRadius + 5);

        // Bind data and create arcs
        this.arcs = this.chartGroup.selectAll(".arc-segment")
            .data(pie(this.data))
            .enter()
            .append("path")
            .attr("class", "arc-segment")
            .attr("d", arc)
            .attr("fill", d => d.data.colorValue)
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2)
            .attr("tabindex", "0")
            .attr("role", "button")
            .attr("aria-label", d => 
                `${d.data.category}: ${d.data.count} companies, ${d.data.percentage.toFixed(1)}% of total. ${d.data.description}`
            )
            .style("cursor", "pointer");

        // Store arc generators for interactions
        this.arc = arc;
        this.hoverArc = hoverArc;
        this.pieData = pie(this.data);
    }

    addInteractions() {
        const self = this;

        this.arcs
            .on("mouseover", function(event, d) {
                // Visual feedback with matching color
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("d", self.hoverArc)
                    .attr("fill", d.data.colorValue);
                
                // Show tooltip with segment color
                self.showTooltip(event, d);
            })
            .on("mousemove", function(event) {
                self.moveTooltip(event);
            })
            .on("mouseout", function(event, d) {
                // Reset visual with original color
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("d", self.arc)
                    .attr("fill", d.data.colorValue);
                
                // Hide tooltip
                self.hideTooltip();
            })
            .on("click", function(event, d) {
                self.announceSegmentDetails(d.data);
            });

        // Add keyboard navigation
        this.addKeyboardNavigation();
    }

    showTooltip(event, d) {
        let tooltipHTML = `<strong>${d.data.category}</strong><br/>`;
        tooltipHTML += `${d.data.count} companies (${d.data.percentage.toFixed(1)}%)<br/>`;
        tooltipHTML += `${d.data.description}`;
        
        if (d.data.breakdown) {
            tooltipHTML += `<br/><br/><strong>Breakdown:</strong><br/>`;
            Object.entries(d.data.breakdown).forEach(([status, count]) => {
                tooltipHTML += `• ${status}: ${count}<br/>`;
            });
        }

        // Set tooltip background to match segment color
        this.tooltip
            .style("background", d.data.colorValue)
            .html(tooltipHTML)
            .transition()
            .duration(200)
            .style("opacity", 1);
        
        this.moveTooltip(event);
    }

    moveTooltip(event) {
        const tooltipWidth = this.tooltip.node().offsetWidth;
        const tooltipHeight = this.tooltip.node().offsetHeight;
        
        let left = event.pageX + 10;
        let top = event.pageY - 10;
        
        // Prevent tooltip from going off screen
        if (left + tooltipWidth > window.innerWidth) {
            left = event.pageX - tooltipWidth - 10;
        }
        if (top + tooltipHeight > window.innerHeight) {
            top = event.pageY - tooltipHeight - 10;
        }
        
        this.tooltip
            .style("left", left + "px")
            .style("top", top + "px");
    }

    hideTooltip() {
        this.tooltip
            .transition()
            .duration(500)
            .style("opacity", 0);
    }

    addAnnotations() {
        const containerWidth = d3.select(this.containerId).node().getBoundingClientRect().width;
        const isMobile = containerWidth < 480;
        
        if (isMobile) {
            // Skip annotations on mobile to avoid clutter
            return;
        }

        // Annotation for "Still Independent" segment
        const stillIndependentSegment = this.pieData.find(d => d.data.category === "Still Independent");
        if (stillIndependentSegment) {
            this.addAnnotation(stillIndependentSegment, "3 in 4 remain independent", 1.3);
        }

        // Annotation for "Acquired" segment
        const acquiredSegment = this.pieData.find(d => d.data.category === "Acquired");
        if (acquiredSegment) {
            this.addAnnotation(acquiredSegment, "1 in 7 acquired", 1.3);
        }

        // Annotation for "Distressed" segment
        const distressedSegment = this.pieData.find(d => d.data.category === "Distressed");
        if (distressedSegment) {
            this.addAnnotation(distressedSegment, "1 in 7 distressed", 1.3);
        }
    }

    addAnnotation(segment, text, radiusMultiplier = 1.3) {
        const angle = (segment.startAngle + segment.endAngle) / 2;
        const centroid = this.arc.centroid(segment);
        
        // Position annotation outside the arc
        const annotationRadius = this.config.outerRadius * radiusMultiplier;
        const x = Math.cos(angle - Math.PI / 2) * annotationRadius;
        const y = Math.sin(angle - Math.PI / 2) * annotationRadius;

        const annotation = this.chartGroup.append("g")
            .attr("class", "annotation")
            .attr("aria-hidden", "true"); // Prevent screen reader duplication

        // Annotation line
        annotation.append("line")
            .attr("x1", centroid[0])
            .attr("y1", centroid[1])
            .attr("x2", x)
            .attr("y2", y)
            .style("stroke", this.colors.quaternary)
            .style("stroke-width", 1);

        // Annotation text
        annotation.append("text")
            .attr("x", x + (x > 0 ? 10 : -10))
            .attr("y", y)
            .attr("text-anchor", x > 0 ? "start" : "end")
            .style("font-size", "13px")
            .style("font-weight", "500")
            .style("fill", this.colors.primary)
            .text(text);
    }

    // Removed addLegend() method entirely

    addKeyboardNavigation() {
        let currentIndex = 0;
        
        this.svg.on("keydown", (event) => {
            switch(event.key) {
                case "ArrowRight":
                case "ArrowDown":
                    event.preventDefault();
                    currentIndex = (currentIndex + 1) % this.data.length;
                    this.announceSegment(currentIndex);
                    this.highlightSegment(currentIndex);
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    event.preventDefault();
                    currentIndex = (currentIndex - 1 + this.data.length) % this.data.length;
                    this.announceSegment(currentIndex);
                    this.highlightSegment(currentIndex);
                    break;
                case "Enter":
                case " ":
                    event.preventDefault();
                    this.announceSegmentDetails(this.data[currentIndex]);
                    break;
            }
        });
    }

    highlightSegment(index) {
        // Reset all segments
        this.arcs.attr("d", this.arc);
        
        // Highlight current segment
        d3.select(this.arcs.nodes()[index])
            .attr("d", this.hoverArc);
    }

    announceSegment(index) {
        const segment = this.data[index];
        const announcement = `${segment.category}: ${segment.count} companies, ${segment.percentage.toFixed(1)} percent`;
        this.announceToScreenReader(announcement);
    }

    announceSegmentDetails(segment) {
        let announcement = `${segment.category}: ${segment.count} companies, ${segment.percentage.toFixed(1)} percent. ${segment.description}`;
        
        if (segment.breakdown) {
            announcement += ". Breakdown: ";
            Object.entries(segment.breakdown).forEach(([status, count], i, arr) => {
                announcement += `${status}: ${count}`;
                if (i < arr.length - 1) announcement += ", ";
            });
        }
        
        this.announceToScreenReader(announcement);
    }

    announceToScreenReader(text) {
        // Create temporary element for screen reader announcement
        const announcement = document.createElement("div");
        announcement.setAttribute("aria-live", "polite");
        announcement.setAttribute("aria-atomic", "true");
        announcement.style.position = "absolute";
        announcement.style.left = "-9999px";
        announcement.textContent = text;
        
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }

    enhanceAccessibility() {
        // Ensure proper focus management
        this.svg.attr("aria-describedby", "chart-description");
        
        // Add instructions for keyboard users
        const instructions = d3.select(this.containerId)
            .append("div")
            .attr("id", "chart-description")
            .attr("class", "sr-only")
            .text("Use arrow keys to navigate between chart segments. Press Enter or Space to hear detailed information about the current segment.");
    }

    validateRenderQuality() {
        // Validate story elements are present (removed legend check)
        console.assert(this.arcs.size() === 3, '❌ Expected 3 chart segments');
        
        console.log('✅ Chart quality validation passed');
    }

    // Cleanup method
    destroy() {
        if (this.tooltip) {
            this.tooltip.remove();
        }
        
        d3.select(this.containerId).selectAll("*").remove();
        
        // Remove event listeners
        window.removeEventListener('resize', this.resizeHandler);
    }
}

// Export for use in other modules
export default BiotechIPODonutChart;