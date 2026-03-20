# Blueprint: Stock Analyst AI Agent Web Interface

## Overview

This project creates a web-based interface for a stock analysis AI agent. The interface is designed based on the analysis framework defined in `stock_analyst_agent.md`. It uses a modular approach, with separate HTML files for each analysis section, which are then dynamically loaded into a central `index.html` page.

## Project Structure

*   `index.html`: The main entry point of the application. It contains the main layout, navigation, and a content area where a section's contents will be displayed.
*   `main.js`: Contains the JavaScript logic for fetching and displaying the content from the other HTML files.
*   `style.css`: Provides styling for the application, including the layout, navigation, and content sections.
*   `company_overview.html`: HTML content for the "Company Overview" section.
*   `financial_analysis.html`: HTML content for the "Financial Analysis" section.
*   `industry_analysis.html`: HTML content for the "Industry Analysis" section.
*   `momentum_analysis.html`: HTML content for the "Momentum Analysis" section.
*   `risk_factors.html`: HTML content for the "Risk Factors" section.
*   `comprehensive_opinion.html`: HTML content for the "Comprehensive Opinion" section.
*   `stock_analyst_agent.md`: The system prompt defining the AI agent's behavior.

## Current Plan

1.  **Create HTML files for each analysis section**: Create `company_overview.html`, `financial_analysis.html`, `industry_analysis.html`, `momentum_analysis.html`, `risk_factors.html`, and `comprehensive_opinion.html`. Each file will contain the basic HTML structure for its respective section.
2.  **Update `index.html`**: Modify the main HTML file to include a navigation menu and a container element where the content of the other HTML files will be loaded.
3.  **Update `main.js`**: Implement the JavaScript functionality to handle navigation clicks, fetch the content of the corresponding HTML file, and inject it into the content container in `index.html`.
4.  **Update `style.css`**: Add CSS rules to style the navigation menu, the content area, and the overall layout of the page to ensure a good user experience.
