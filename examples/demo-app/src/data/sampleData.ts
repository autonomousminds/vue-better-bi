export const salesData = [
  { month: 'Jan', sales: 12500, orders: 145, region: 'North' },
  { month: 'Feb', sales: 15200, orders: 178, region: 'North' },
  { month: 'Mar', sales: 18900, orders: 210, region: 'North' },
  { month: 'Apr', sales: 16400, orders: 189, region: 'North' },
  { month: 'May', sales: 21000, orders: 245, region: 'North' },
  { month: 'Jun', sales: 24500, orders: 289, region: 'North' },
  { month: 'Jan', sales: 9800, orders: 112, region: 'South' },
  { month: 'Feb', sales: 11200, orders: 134, region: 'South' },
  { month: 'Mar', sales: 14500, orders: 167, region: 'South' },
  { month: 'Apr', sales: 13200, orders: 152, region: 'South' },
  { month: 'May', sales: 17800, orders: 198, region: 'South' },
  { month: 'Jun', sales: 19200, orders: 221, region: 'South' }
];

export const timeSeriesData = Array.from({ length: 100 }, (_, i) => ({
  day: `Day ${i + 1}`,
  value: Math.round(1000 + Math.random() * 500 + Math.sin(i / 10) * 200),
  trend: Math.round(1000 + i * 5 + Math.random() * 100)
}));

export const scatterData = [
  { age: 25, income: 45000, spending: 1200 },
  { age: 32, income: 65000, spending: 2100 },
  { age: 28, income: 52000, spending: 1500 },
  { age: 45, income: 95000, spending: 3200 },
  { age: 38, income: 78000, spending: 2800 },
  { age: 52, income: 120000, spending: 4500 },
  { age: 29, income: 48000, spending: 1400 },
  { age: 35, income: 72000, spending: 2400 },
  { age: 41, income: 88000, spending: 3100 },
  { age: 48, income: 105000, spending: 3800 },
  { age: 22, income: 38000, spending: 900 },
  { age: 55, income: 135000, spending: 5200 },
  { age: 33, income: 68000, spending: 2300 },
  { age: 27, income: 50000, spending: 1350 },
  { age: 44, income: 92000, spending: 3400 },
  { age: 36, income: 75000, spending: 2600 },
  { age: 50, income: 115000, spending: 4100 },
  { age: 31, income: 62000, spending: 1900 },
  { age: 39, income: 82000, spending: 2900 },
  { age: 46, income: 98000, spending: 3600 }
];

export const occupationBubbleData = [
  { occupation: 'Professional', customer_count: 5606, avg_income: 226454 },
  { occupation: 'Skilled Manual', customer_count: 4649, avg_income: 205786 },
  { occupation: 'Management', customer_count: 3147, avg_income: 319002 },
  { occupation: 'Clerical', customer_count: 3014, avg_income: 315169 },
  { occupation: 'Manual', customer_count: 2453, avg_income: 297277 },
];

export const heatmapData = [
  { day: 'Mon', hour: '9am', value: 45 },
  { day: 'Mon', hour: '12pm', value: 78 },
  { day: 'Mon', hour: '3pm', value: 62 },
  { day: 'Mon', hour: '6pm', value: 35 },
  { day: 'Tue', hour: '9am', value: 52 },
  { day: 'Tue', hour: '12pm', value: 89 },
  { day: 'Tue', hour: '3pm', value: 71 },
  { day: 'Tue', hour: '6pm', value: 42 },
  { day: 'Wed', hour: '9am', value: 48 },
  { day: 'Wed', hour: '12pm', value: 95 },
  { day: 'Wed', hour: '3pm', value: 68 },
  { day: 'Wed', hour: '6pm', value: 38 },
  { day: 'Thu', hour: '9am', value: 55 },
  { day: 'Thu', hour: '12pm', value: 82 },
  { day: 'Thu', hour: '3pm', value: 74 },
  { day: 'Thu', hour: '6pm', value: 45 },
  { day: 'Fri', hour: '9am', value: 42 },
  { day: 'Fri', hour: '12pm', value: 76 },
  { day: 'Fri', hour: '3pm', value: 58 },
  { day: 'Fri', hour: '6pm', value: 28 }
];

export const funnelData = [
  { stage: 'Visitors', count: 10000 },
  { stage: 'Leads', count: 5200 },
  { stage: 'Qualified', count: 2800 },
  { stage: 'Proposals', count: 1400 },
  { stage: 'Closed', count: 680 }
];

export const pieData = [
  { category: 'Electronics', revenue: 42000 },
  { category: 'Clothing', revenue: 28000 },
  { category: 'Food & Beverage', revenue: 19500 },
  { category: 'Home & Garden', revenue: 15200 },
  { category: 'Sports', revenue: 11800 },
  { category: 'Books', revenue: 8400 },
  { category: 'Other', revenue: 5100 },
  { category: 'Toys', revenue: 0 },
  { category: 'Automotive', revenue: 0 }
];

export const sankeyData = [
  { source: 'Website', target: 'Signup', value: 500 },
  { source: 'Email', target: 'Signup', value: 300 },
  { source: 'Social', target: 'Signup', value: 200 },
  { source: 'Signup', target: 'Trial', value: 700 },
  { source: 'Signup', target: 'Purchase', value: 100 },
  { source: 'Trial', target: 'Purchase', value: 350 }
];

export const waterfallData = [
  { category: 'Q1 Revenue', amount: 500000, isTotal: true },
  { category: 'New Customers', amount: 120000, isTotal: false },
  { category: 'Churn', amount: -45000, isTotal: false },
  { category: 'Upsells', amount: 30000, isTotal: false },
  { category: 'Price Changes', amount: -12000, isTotal: false },
  { category: 'Q2 Revenue', amount: 593000, isTotal: true },
];

export const boxPlotData = [
  { group: 'Team A', min: 12, q1: 25, median: 35, q3: 48, max: 62 },
  { group: 'Team B', min: 18, q1: 30, median: 42, q3: 55, max: 70 },
  { group: 'Team C', min: 8, q1: 20, median: 28, q3: 38, max: 52 },
  { group: 'Team D', min: 22, q1: 35, median: 45, q3: 58, max: 75 },
  { group: 'Team E', min: 15, q1: 28, median: 38, q3: 50, max: 65 }
];

export const histogramData = Array.from({ length: 200 }, () => ({
  income: Math.round(30000 + Math.random() * 90000 + (Math.random() > 0.7 ? 30000 : 0))
}));

export const calendarData = (() => {
  const data = [];
  const start = new Date(2024, 0, 1);
  for (let i = 0; i < 365; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toISOString().split('T')[0],
      contributions: Math.floor(Math.random() * 12)
    });
  }
  return data;
})();

export const usMapData = [
  { state: 'California', population: 39538 },
  { state: 'Texas', population: 29146 },
  { state: 'Florida', population: 21538 },
  { state: 'New York', population: 20201 },
  { state: 'Pennsylvania', population: 13003 },
  { state: 'Illinois', population: 12812 },
  { state: 'Ohio', population: 11800 },
  { state: 'Georgia', population: 10712 },
  { state: 'North Carolina', population: 10439 },
  { state: 'Michigan', population: 10078 },
  { state: 'New Jersey', population: 9289 },
  { state: 'Virginia', population: 8632 },
  { state: 'Washington', population: 7615 },
  { state: 'Arizona', population: 7279 },
  { state: 'Massachusetts', population: 7030 },
  { state: 'Tennessee', population: 6911 },
  { state: 'Indiana', population: 6786 },
  { state: 'Maryland', population: 6177 },
  { state: 'Missouri', population: 6155 },
  { state: 'Wisconsin', population: 5894 },
  { state: 'Colorado', population: 5774 },
  { state: 'Minnesota', population: 5707 },
  { state: 'South Carolina', population: 5119 },
  { state: 'Alabama', population: 5024 },
  { state: 'Louisiana', population: 4658 },
  { state: 'Kentucky', population: 4506 },
  { state: 'Oregon', population: 4238 },
  { state: 'Oklahoma', population: 3960 },
  { state: 'Connecticut', population: 3606 },
  { state: 'Utah', population: 3272 },
  { state: 'Iowa', population: 3191 },
  { state: 'Nevada', population: 3105 },
  { state: 'Arkansas', population: 3012 },
  { state: 'Mississippi', population: 2961 },
  { state: 'Kansas', population: 2937 },
  { state: 'New Mexico', population: 2118 },
  { state: 'Nebraska', population: 1962 },
  { state: 'Idaho', population: 1901 },
  { state: 'West Virginia', population: 1794 },
  { state: 'Hawaii', population: 1456 },
  { state: 'New Hampshire', population: 1377 },
  { state: 'Maine', population: 1362 },
  { state: 'Montana', population: 1085 },
  { state: 'Rhode Island', population: 1098 },
  { state: 'Delaware', population: 990 },
  { state: 'South Dakota', population: 887 },
  { state: 'North Dakota', population: 779 },
  { state: 'Alaska', population: 733 },
  { state: 'Vermont', population: 643 },
  { state: 'Wyoming', population: 577 }
];

export const countryData = [
  { country: 'United States', lat: 39.83, long: -98.58, gdp: 25460, population: 331900 },
  { country: 'China', lat: 35.86, long: 104.20, gdp: 17960, population: 1425900 },
  { country: 'Japan', lat: 36.20, long: 138.25, gdp: 4230, population: 125700 },
  { country: 'Germany', lat: 51.17, long: 10.45, gdp: 4070, population: 83200 },
  { country: 'United Kingdom', lat: 55.38, long: -3.44, gdp: 3070, population: 67800 },
  { country: 'India', lat: 20.59, long: 78.96, gdp: 3390, population: 1428600 },
  { country: 'France', lat: 46.23, long: 2.21, gdp: 2780, population: 67750 },
  { country: 'Brazil', lat: -14.24, long: -51.93, gdp: 1920, population: 215300 },
  { country: 'Canada', lat: 56.13, long: -106.35, gdp: 2140, population: 38930 },
  { country: 'Italy', lat: 41.87, long: 12.57, gdp: 2010, population: 59110 },
  { country: 'Australia', lat: -25.27, long: 133.78, gdp: 1680, population: 26440 },
  { country: 'South Korea', lat: 35.91, long: 127.77, gdp: 1670, population: 51740 },
  { country: 'Mexico', lat: 23.63, long: -102.55, gdp: 1320, population: 128900 },
  { country: 'Indonesia', lat: -0.79, long: 113.92, gdp: 1320, population: 275500 },
  { country: 'Turkey', lat: 38.96, long: 35.24, gdp: 910, population: 85280 },
  { country: 'Saudi Arabia', lat: 23.89, long: 45.08, gdp: 1110, population: 36410 },
  { country: 'Nigeria', lat: 9.08, long: 8.68, gdp: 477, population: 223800 },
  { country: 'South Africa', lat: -30.56, long: 22.94, gdp: 405, population: 60410 },
  { country: 'Egypt', lat: 26.82, long: 30.80, gdp: 477, population: 112720 },
  { country: 'Argentina', lat: -38.42, long: -63.62, gdp: 632, population: 45810 },
];

export const tableData = [
  { name: 'Alice Johnson', department: 'Engineering', region: 'West', salary: 125000, growth_pct: 0.12, tenure: 5, rating: 4.5 },
  { name: 'Bob Smith', department: 'Engineering', region: 'West', salary: 118000, growth_pct: 0.08, tenure: 3, rating: 4.2 },
  { name: 'Carol Davis', department: 'Engineering', region: 'East', salary: 132000, growth_pct: 0.15, tenure: 7, rating: 4.8 },
  { name: 'Dan Brown', department: 'Marketing', region: 'West', salary: 95000, growth_pct: -0.03, tenure: 2, rating: 3.9 },
  { name: 'Eve Wilson', department: 'Marketing', region: 'East', salary: 102000, growth_pct: 0.10, tenure: 4, rating: 4.1 },
  { name: 'Frank Lee', department: 'Marketing', region: 'East', salary: 89000, growth_pct: -0.05, tenure: 1, rating: 3.7 },
  { name: 'Grace Kim', department: 'Sales', region: 'West', salary: 108000, growth_pct: 0.22, tenure: 6, rating: 4.6 },
  { name: 'Hank Jones', department: 'Sales', region: 'East', salary: 97000, growth_pct: 0.18, tenure: 4, rating: 4.3 },
  { name: 'Ivy Chen', department: 'Sales', region: 'West', salary: 115000, growth_pct: 0.25, tenure: 8, rating: 4.9 },
  { name: 'Jack Miller', department: 'Engineering', region: 'East', salary: 140000, growth_pct: 0.05, tenure: 10, rating: 4.7 },
  { name: 'Kate Taylor', department: 'Sales', region: 'East', salary: 91000, growth_pct: -0.02, tenure: 1, rating: 3.8 },
  { name: 'Leo Martinez', department: 'Marketing', region: 'West', salary: 98000, growth_pct: 0.07, tenure: 3, rating: 4.0 },
  { name: 'Mia Anderson', department: 'Engineering', region: 'West', salary: 128000, growth_pct: 0.11, tenure: 6, rating: 4.4 },
  { name: 'Noah Thomas', department: 'Sales', region: 'West', salary: 105000, growth_pct: 0.14, tenure: 5, rating: 4.2 },
  { name: 'Olivia Jackson', department: 'Marketing', region: 'East', salary: 87000, growth_pct: 0.09, tenure: 2, rating: 4.1 },
  { name: 'Pete White', department: 'Engineering', region: 'East', salary: 135000, growth_pct: 0.06, tenure: 9, rating: 4.6 },
  { name: 'Quinn Harris', department: 'Sales', region: 'East', salary: 99000, growth_pct: 0.20, tenure: 3, rating: 4.4 },
  { name: 'Rose Clark', department: 'Marketing', region: 'West', salary: 93000, growth_pct: -0.01, tenure: 2, rating: 3.6 },
  { name: 'Sam Lewis', department: 'Engineering', region: 'West', salary: 122000, growth_pct: 0.13, tenure: 4, rating: 4.3 },
  { name: 'Tina Walker', department: 'Sales', region: 'East', salary: 110000, growth_pct: 0.16, tenure: 7, rating: 4.5 },
];

// Daily orders spanning two periods. Demonstrates:
// - agg="sum" on current_orders → big number = 4,820 (current period total)
// - comparisonAgg="sum" on prev_orders → comparison = 3,640 (previous period total)
// - sparklineY="orders" → sparkline shows full trend (non-zero on all rows)
export const bigValueData: Record<string, unknown>[] = [
  // Previous period (Jan 1–14)
  { date: '2025-01-01', orders: 180, current_orders: 0, prev_orders: 180 },
  { date: '2025-01-02', orders: 220, current_orders: 0, prev_orders: 220 },
  { date: '2025-01-03', orders: 195, current_orders: 0, prev_orders: 195 },
  { date: '2025-01-04', orders: 140, current_orders: 0, prev_orders: 140 },
  { date: '2025-01-05', orders: 160, current_orders: 0, prev_orders: 160 },
  { date: '2025-01-06', orders: 310, current_orders: 0, prev_orders: 310 },
  { date: '2025-01-07', orders: 340, current_orders: 0, prev_orders: 340 },
  { date: '2025-01-08', orders: 280, current_orders: 0, prev_orders: 280 },
  { date: '2025-01-09', orders: 250, current_orders: 0, prev_orders: 250 },
  { date: '2025-01-10', orders: 270, current_orders: 0, prev_orders: 270 },
  { date: '2025-01-11', orders: 155, current_orders: 0, prev_orders: 155 },
  { date: '2025-01-12', orders: 130, current_orders: 0, prev_orders: 130 },
  { date: '2025-01-13', orders: 320, current_orders: 0, prev_orders: 320 },
  { date: '2025-01-14', orders: 290, current_orders: 0, prev_orders: 290 },
  // Current period (Jan 15–28) — trending higher
  { date: '2025-01-15', orders: 350, current_orders: 350, prev_orders: 0 },
  { date: '2025-01-16', orders: 380, current_orders: 380, prev_orders: 0 },
  { date: '2025-01-17', orders: 290, current_orders: 290, prev_orders: 0 },
  { date: '2025-01-18', orders: 200, current_orders: 200, prev_orders: 0 },
  { date: '2025-01-19', orders: 190, current_orders: 190, prev_orders: 0 },
  { date: '2025-01-20', orders: 410, current_orders: 410, prev_orders: 0 },
  { date: '2025-01-21', orders: 440, current_orders: 440, prev_orders: 0 },
  { date: '2025-01-22', orders: 370, current_orders: 370, prev_orders: 0 },
  { date: '2025-01-23', orders: 320, current_orders: 320, prev_orders: 0 },
  { date: '2025-01-24', orders: 360, current_orders: 360, prev_orders: 0 },
  { date: '2025-01-25', orders: 210, current_orders: 210, prev_orders: 0 },
  { date: '2025-01-26', orders: 180, current_orders: 180, prev_orders: 0 },
  { date: '2025-01-27', orders: 420, current_orders: 420, prev_orders: 0 },
  { date: '2025-01-28', orders: 400, current_orders: 400, prev_orders: 0 },
];

export const brandProfitabilityData = [
  { brand_name: 'Contoso', total_sales: 2075978588.57, gross_profit: 1164129424.04, profit_margin: 0.56 },
  { brand_name: 'Fabrikam', total_sales: 1408217410.25, gross_profit: 805671129.78, profit_margin: 0.57 },
  { brand_name: 'Proseware', total_sales: 1205475382.73, gross_profit: 700565604.91, profit_margin: 0.58 },
  { brand_name: 'Litware', total_sales: 1180273556.29, gross_profit: 664680039.18, profit_margin: 0.56 },
  { brand_name: 'Adventure Works', total_sales: 1037108694.87, gross_profit: 592768947.14, profit_margin: 0.57 },
  { brand_name: 'Wide World Importers', total_sales: 764518731.27, gross_profit: 440364743.63, profit_margin: 0.57 },
  { brand_name: 'The Phone Company', total_sales: 673525407.96, gross_profit: 379340915.54, profit_margin: 0.56 },
  { brand_name: 'A. Datum', total_sales: 619803772.02, gross_profit: 367124746.39, profit_margin: 0.59 },
  { brand_name: 'Southridge Video', total_sales: 441967832.04, gross_profit: 240610495.21, profit_margin: 0.54 },
  { brand_name: 'Northwind Traders', total_sales: 418668917.24, gross_profit: 234655941.3, profit_margin: 0.56 },
  { brand_name: 'Tailspin Toys', total_sales: 17174690.69, gross_profit: 9846456.21, profit_margin: 0.57 },
];

export const productCategoryData = [
  { category: 'Home Appliances', revenue: 421626658.47 },
  { category: 'Computers', revenue: 266795197.02 },
  { category: 'Cameras and camcorders', revenue: 240219234.36 },
  { category: 'Cell phones', revenue: 192344183.21 },
  { category: 'TV and Video', revenue: 178904512.88 },
  { category: 'Audio', revenue: 134567890.15 },
  { category: 'Music, Movies and Audio Books', revenue: 87234561.73 },
  { category: 'Games and Toys', revenue: 52189043.64 },
];

export const productDetailData = [
  { product_category_name: 'Audio', product_name: 'Contoso 8GB Clock & Radio MP3 Player X850 Black', revenue: 6317358.97, cost: 2103255.1, gross_profit: 4214103.87, margin_pct: 0.66, units_sold: 21456 },
  { product_category_name: 'Audio', product_name: 'Contoso 8GB Clock & Radio MP3 Player X850 Silver', revenue: 6036268.36, cost: 2005205.64, gross_profit: 4031062.72, margin_pct: 0.66, units_sold: 20495 },
  { product_category_name: 'Audio', product_name: 'Contoso 8GB Clock & Radio MP3 Player X850 Green', revenue: 6021486.4, cost: 2003520.26, gross_profit: 4017966.14, margin_pct: 0.66, units_sold: 20439 },
  { product_category_name: 'Audio', product_name: 'Contoso 8GB Clock & Radio MP3 Player X850 Blue', revenue: 5966703.34, cost: 1982502.58, gross_profit: 3984200.76, margin_pct: 0.66, units_sold: 20262 },
  { product_category_name: 'Audio', product_name: 'WWI 2GB Pulse Smart pen M100 Silver', revenue: 4050708.01, cost: 1867964.25, gross_profit: 2182743.76, margin_pct: 0.53, units_sold: 20559 },
  { product_category_name: 'Cameras and camcorders ', product_name: 'Fabrikam Independent Filmmaker 1" 25mm X400 Blue', revenue: 31744337.4, cost: 10578071.92, gross_profit: 21166265.48, margin_pct: 0.66, units_sold: 19915 },
  { product_category_name: 'Cameras and camcorders ', product_name: 'Fabrikam Independent Filmmaker 1/2\'\' 3mm X300 Black', revenue: 28884788.4, cost: 9611011.7, gross_profit: 19273776.7, margin_pct: 0.66, units_sold: 18810 },
  { product_category_name: 'Cameras and camcorders ', product_name: 'Fabrikam Independent Filmmaker 2/3\'\' 17mm X100 Black', revenue: 25212825, cost: 8390016.36, gross_profit: 16822808.64, margin_pct: 0.66, units_sold: 17081 },
  { product_category_name: 'Cameras and camcorders ', product_name: 'Fabrikam Independent filmmaker 1\'\' 25mm X400 White', revenue: 23193440, cost: 7743316.77, gross_profit: 15450123.23, margin_pct: 0.66, units_sold: 14772 },
  { product_category_name: 'Cameras and camcorders ', product_name: 'Fabrikam Independent Filmmaker 1/3" 8.5mm X200 Blue', revenue: 22854466.8, cost: 7648915.88, gross_profit: 15205550.92, margin_pct: 0.66, units_sold: 15224 },
  { product_category_name: 'Cell phones', product_name: 'Cigarette Lighter Adapter for Contoso Phones E110 Black', revenue: 10227463.3, cost: 5218304, gross_profit: 5009159.3, margin_pct: 0.48, units_sold: 409600 },
  { product_category_name: 'Cell phones', product_name: 'Cigarette Lighter Adapter for Contoso Phones E110 White', revenue: 10062025.46, cost: 5133965.2, gross_profit: 4928060.26, margin_pct: 0.48, units_sold: 402980 },
  { product_category_name: 'Cell phones', product_name: 'Cigarette Lighter Adapter for Contoso Phones E110 Red', revenue: 9827980.34, cost: 5014464, gross_profit: 4813516.34, margin_pct: 0.48, units_sold: 393600 },
  { product_category_name: 'Cell phones', product_name: 'The Phone Company Touch Screen Phone 1600 TFT-1.4" L250 Gold', revenue: 9310729.41, cost: 3100738.35, gross_profit: 6209991.06, margin_pct: 0.66, units_sold: 16064 },
  { product_category_name: 'Cell phones', product_name: 'The Phone Company Touch Screen Phone 1600 TFT-1.4" L250 Grey', revenue: 9053418.87, cost: 3019360.8, gross_profit: 6034058.07, margin_pct: 0.66, units_sold: 15651 },
  { product_category_name: 'Computers', product_name: 'Proseware Projector 1080p DLP86 White', revenue: 51901056.27, cost: 17278905.93, gross_profit: 34622150.34, margin_pct: 0.66, units_sold: 21092 },
  { product_category_name: 'Computers', product_name: 'Proseware Projector 1080p DLP86 Silver', revenue: 51484223.07, cost: 17141462.91, gross_profit: 34342760.16, margin_pct: 0.66, units_sold: 20942 },
  { product_category_name: 'Computers', product_name: 'Proseware Projector 1080p DLP86 Black', revenue: 49266460.53, cost: 16386354.27, gross_profit: 32880106.26, margin_pct: 0.66, units_sold: 20006 },
  { product_category_name: 'Computers', product_name: 'Proseware Projector 1080p LCD86 White', revenue: 47504870.55, cost: 15825028.56, gross_profit: 31679841.99, margin_pct: 0.66, units_sold: 21040 },
  { product_category_name: 'Computers', product_name: 'Contoso Projector 1080p X980 White', revenue: 47499546.15, cost: 15799175.64, gross_profit: 31700370.51, margin_pct: 0.66, units_sold: 21013 },
  { product_category_name: 'Games and Toys', product_name: 'SV Hand Games for Office worker L28 Black', revenue: 1795714.09, cost: 596971.42, gross_profit: 1198742.67, margin_pct: 0.66, units_sold: 106034 },
  { product_category_name: 'Games and Toys', product_name: 'MGS Hand Games for Office worker L299 Silver', revenue: 1758937.75, cost: 584981.6, gross_profit: 1173956.15, margin_pct: 0.66, units_sold: 104461 },
  { product_category_name: 'Games and Toys', product_name: 'MGS Hand Games for Office worker L299 Black', revenue: 1725333.28, cost: 573882.4, gross_profit: 1151450.88, margin_pct: 0.66, units_sold: 102479 },
  { product_category_name: 'Games and Toys', product_name: 'SV Hand Games for Office worker L28 Red', revenue: 1723394.08, cost: 572897.54, gross_profit: 1150496.54, margin_pct: 0.66, units_sold: 101758 },
  { product_category_name: 'Games and Toys', product_name: 'MGS Hand Games for Office worker L299 Yellow', revenue: 1719310.29, cost: 571961.6, gross_profit: 1147348.69, margin_pct: 0.66, units_sold: 102136 },
  { product_category_name: 'Home Appliances', product_name: 'Litware Refrigerator 24.7CuFt X980 Grey', revenue: 45628528.62, cost: 15226879.64, gross_profit: 30401648.98, margin_pct: 0.66, units_sold: 14528 },
  { product_category_name: 'Home Appliances', product_name: 'Litware Refrigerator 24.7CuFt X980 Brown', revenue: 44321044.61, cost: 14807032.52, gross_profit: 29514012.09, margin_pct: 0.66, units_sold: 14107 },
  { product_category_name: 'Home Appliances', product_name: 'Litware Refrigerator 24.7CuFt X980 Blue', revenue: 43627158.95, cost: 14571663.68, gross_profit: 29055495.27, margin_pct: 0.66, units_sold: 13888 },
  { product_category_name: 'Home Appliances', product_name: 'Litware Refrigerator 24.7CuFt X980 Silver', revenue: 43479927.16, cost: 14514411.8, gross_profit: 28965515.36, margin_pct: 0.66, units_sold: 13830 },
  { product_category_name: 'Home Appliances', product_name: 'Litware Refrigerator 24.7CuFt X980 White', revenue: 41716509, cost: 13957796.3, gross_profit: 27758712.7, margin_pct: 0.66, units_sold: 13298 },
  { product_category_name: 'Music, Movies and Audio Books', product_name: 'Contoso DVD 15-Inch Player Portable L200 Black', revenue: 6126551, cost: 2040931.36, gross_profit: 4085619.64, margin_pct: 0.66, units_sold: 21465 },
  { product_category_name: 'Music, Movies and Audio Books', product_name: 'SV DVD 15-Inch Player Portable L200 Black', revenue: 6117262.61, cost: 2036223.44, gross_profit: 4081039.17, margin_pct: 0.66, units_sold: 21430 },
  { product_category_name: 'Music, Movies and Audio Books', product_name: 'Contoso DVD 15-Inch Player Portable L200 Silver', revenue: 6073793.08, cost: 2022772.24, gross_profit: 4051020.84, margin_pct: 0.66, units_sold: 21267 },
  { product_category_name: 'Music, Movies and Audio Books', product_name: 'SV DVD 15-Inch Player Portable L200 Silver', revenue: 6047783.73, cost: 2010666.16, gross_profit: 4037117.57, margin_pct: 0.66, units_sold: 21168 },
  { product_category_name: 'Music, Movies and Audio Books', product_name: 'Contoso DVD 15-Inch Player Portable L200 White', revenue: 5911189.92, cost: 1967141.92, gross_profit: 3944048, margin_pct: 0.66, units_sold: 20693 },
  { product_category_name: 'TV and Video', product_name: 'Contoso Home Theater System 7.1 Channel M1700 Black', revenue: 19903696.54, cost: 6614484.78, gross_profit: 13289211.76, margin_pct: 0.66, units_sold: 22726 },
  { product_category_name: 'TV and Video', product_name: 'Contoso Home Theater System 7.1 Channel M1700 Brown', revenue: 19413759.75, cost: 6447775.14, gross_profit: 12965984.61, margin_pct: 0.66, units_sold: 22159 },
  { product_category_name: 'TV and Video', product_name: 'Contoso Home Theater System 7.1 Channel M1700 White', revenue: 19086278.82, cost: 6339678.96, gross_profit: 12746599.86, margin_pct: 0.66, units_sold: 21793 },
  { product_category_name: 'TV and Video', product_name: 'Contoso Home Theater System 7.1 Channel M1700 Silver', revenue: 18633911.17, cost: 6198005.22, gross_profit: 12435905.95, margin_pct: 0.66, units_sold: 21283 },
  { product_category_name: 'TV and Video', product_name: 'Adventure Works 42" LCD HDTV M55 Black', revenue: 15985525.13, cost: 8164728.5, gross_profit: 7820796.63, margin_pct: 0.48, units_sold: 21223 },
];

export const sampleDatasets: Record<string, Record<string, unknown>[]> = {
  sales: salesData,
  timeSeries: timeSeriesData,
  scatter: scatterData,
  bubble: occupationBubbleData,
  heatmap: heatmapData,
  funnel: funnelData,
  pie: pieData,
  sankey: sankeyData,
  waterfall: waterfallData,
  boxPlot: boxPlotData,
  histogram: histogramData,
  calendar: calendarData,
  usMap: usMapData,
  areaMap: usMapData,
  pointMap: countryData,
  bubbleMap: countryData,
  table: tableData,
  bigValue: bigValueData,
  brandProfitability: brandProfitabilityData,
  productCategory: productCategoryData,
  productDetail: productDetailData,
};
