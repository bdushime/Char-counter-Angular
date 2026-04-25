# Real-Time Character Counter App

 # Deployed Link:

A full-featured, responsive text analysis tool built with modern Angular. This application provides real-time statistics including character limits, precise letter density mapping, word tracking, and dynamic Light/Dark mode styling.

##  Features

- **Real-Time Statistical Tracking**: Instantly calculates total characters, word count, sentence count, and estimated reading time.
- **Letter Density Analysis**: Maps out the exact percentage and frequency of the top used alphabetical characters dynamically.
- **"Exclude Spaces" Toggle**: Offers flexible counting metrics for strict character limits.
- **Predictive Limits**: Users can set custom character limits with seamless UI validation and physical `maxlength` prevention.
- **Global Theme Toggling**: Instant Light/Dark mode switching managed natively via CSS variables and Angular component bindings.
- **Responsive Layout**: Adapts flawlessly to mobile, tablet, and desktop viewports using CSS Grid/Flexbox.

##  Built With

* **Angular (v17+)** - Modern Standalone Components architecture.
* **TypeScript** - Strongly typed Javascript for reliable data flow.
* **Vanilla CSS3** - Custom styling featuring DOM-level Light/Dark dynamic styling.
* **Semantic HTML5** - Accessible, structured markup.

##  Technical Architecture & Learning Focus

This project was built focusing deeply on the core pillars of Angular's component architecture:

* **Parent-to-Child Communication (`@Input`)**: Utilizing a "Manager/Chef" architecture, the `AppComponent` manages state while seamlessly pushing configuration (like limit errors) to dumb UI elements like the `StatCardComponent`.
* **Child-to-Parent Event Flow (`@Output` & `EventEmitter`)**: Implementing custom events in the `TextInputComponent` to broadcast raw string data upwards upon user keystrokes without complex bi-directional data binding.
* **Lifecycle Hook Optimization (`ngOnChanges`)**: Leveraging `ngOnChanges` inside the `LetterDensityComponent` to intercept state changes and run calculation-heavy parsing *only* when the parent explicitly updates the text binding.
* **Structural Directives (`*ngIf` & `*ngFor`)**: Conditionally rendering UI elements, managing state transitions (like expanding lists with a "See More" toggle), and looping through computed arrays dynamically.

##  Running the Project Locally

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**
   ```sh
   git clone [your-repository-url]
   ```
2. **Install NPM packages**
   ```sh
   npm install
   ```
3. **Run the Development Server**
   ```sh
   ng serve --open
   ```
   *The application will automatically launch and reload at `http://localhost:4200/`.*


