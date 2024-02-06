export class DataProcessor{
    static rawFetch;
    static processedData = [];
    static processedChartData = [];
    static exportArray;

    static availableData = [];

    static work = false;
    static source = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/';

    ///Country getter

    static async getAvailableCountries(){
        if(!this.checkSource()){
            await this.fetchData(this.source)
        }
        this.fillCountries(this.rawFetch);
        this.exportArray = this.availableData;
        return this.exportArray;
    }
    static fillCountries(data){
        for(let i = 0; i < data.records.length; i++){
            if(!this.checkCountry(data.records[i].countriesAndTerritories)){
                this.addCountry(data.records[i].countriesAndTerritories)
            }
        }
    }

    static addCountry(country){
        this.availableData.push({countriesAndTerritories: country});
    }
    static checkCountry(country){
        for(let i = 0; i < this.availableData.length; i++){
            if(this.availableData[i].countriesAndTerritories === country) return true;
        }
        return false;
    }

    ///Chart data processor
    static async getChartData(country,ldate,hdate){
        if(!this.work){
            this.work = true;
        }else return [];
        this.processedChartData = [];
        if(!this.checkSource()){
            await this.fetchData(this.source)
        }
        this.fillChartData(this.rawFetch,ldate,hdate,country);
        this.work = false;
        this.exportArray = this.processedChartData.toReversed();
        return this.exportArray;
    }

    static fillChartData(data,lowerdate,higherdate,country){
        console.log(country);
        if(country === undefined){
            for(let i = 0; i < data.records.length; i++){
                if(this.checkDate(lowerdate,higherdate, data.records[i])){
                    if(this.searchReportByMonth(data.records[i]) !== false){
                        this.updateDataChart(data.records[i],this.searchReportByMonth(data.records[i]))
                    }else{
                        this.addReport(data.records[i], country);
                        this.updateDataChart(data.records[i],this.searchReportByMonth(data.records[i]))
                    }
                }
            }
        }else{
            for(let i = 0; i < data.records.length; i++){
                if(data.records[i].countriesAndTerritories !== country) continue;
                if(this.checkDate(lowerdate,higherdate, data.records[i])){

                    if(this.searchReportByMonth(data.records[i]) !== false){
                        this.updateDataChart(data.records[i],this.searchReportByMonth(data.records[i]))
                    }else{
                        this.addReport(data.records[i], country);
                        this.updateDataChart(data.records[i],this.searchReportByMonth(data.records[i]))
                    }
                }
            }
        }
        
    }

    static searchReportByMonth(reportCase){
        for(let i = 0; i < this.processedChartData.length; i++){
            if(this.processedChartData[i].month === reportCase.month && this.processedChartData[i].year === reportCase.year){
                return i;
            }
        }
        return false;
    }
    static updateDataChart(reportCase, reportIndex){
        let current = this.processedChartData[reportIndex];

        current.cases = current.cases + reportCase.cases;
        current.deaths = current.deaths + reportCase.deaths;
    }

    static addReport(reportCase, country){
        let repCountry;
        if (country === undefined){
            repCountry = "World"
        }else repCountry = reportCase.countriesAndTerritories.replace(/_/g, " ");

        let repYear = reportCase.year;
        let repMonth = reportCase.month;

        this.processedChartData.push({countriesAndTerritories: repCountry, year: repYear, month: repMonth, cases:0, deaths: 0});
    }
    // static searchByMonth(month){
    //     for(let i = 0; i < this.processedChartData.length; i++){
    //         if(this.processedChartData[i])
    //     }
    // }


    ///Table data processor
    static async getData(ldate,hdate,filter){
        if(!this.work){
            this.work = true;
        }else return [];
        this.processedData = [];
        if(!this.checkSource()){
            await this.fetchData(this.source);
        }
        this.readAll(this.rawFetch);
        this.fillData(this.rawFetch, ldate, hdate);
        if(filter !== undefined) this.refineByFilters(filter);
        this.exportArray = this.processedData;
        console.log(this.exportArray)
        this.work = false;
        return (!this.checkEmpty()) ? this.exportArray : [];
    }

    static checkSource(){
        return (this.rawFetch !== undefined) ? true : false;
    };
    static async fetchData(source){
        try{
            const response = await fetch(source);
            if(response.ok){
                const data = await response.json();
                this.rawFetch = data;
            }else this.work = false;
        }catch (error){
            console.log(error);
            this.work = false;
        }
    }

    static refineByFilters(filter){
        if(filter.column !== undefined){
            this.processSort(filter.column, filter.polarity);
        }
        if(filter.country !== undefined){
            this.deleteCountries(filter.country);
        }
        if(filter.lowerValue !== undefined || filter.higherValue !== undefined){
            this.deleteOutOfRange(filter.lowerValue, filter.higherValue, filter.column)
        }
    }
    static processSort(column, polarity){
        if(polarity) this.processedData.sort((a,b) => a[column] - b[column]);
            else {
                this.processedData.sort((a,b) => a[column] - b[column]).reverse();
            }
    }

    static deleteCountries(namespace){
        for(let i = 0; i < this.processedData.length; i++){
            if(this.processedData[i].countriesAndTerritories.match(namespace) !== null);
            else if (this.processedData[i].countriesAndTerritories.match(namespace) === null) {
                this.processedData.splice(i, 1);
                i--;
            }
        }
    }

    static deleteOutOfRange(lower,higher,column){
        if(column !== undefined){
            for(let i = 0; i < this.processedData.length; i++){
                if(lower !== undefined && this.processedData[i][column] <= lower){
                    this.processedData.splice(i, 1);
                    i--;
                }else if(higher !== undefined && this.processedData[i][column] >= higher){
                    this.processedData.splice(i, 1);
                    i--;
                }
            }
        }
    }


    static registerCountry(country){
        this.processedData.push({countriesAndTerritories: country, cases:0, deaths: 0, totalCases: 0, totalDeaths: 0, casesPer1000: 0, deathsPer1000: 0, population: 0});
    }

    static searchCountry(country){
        for(let i = 0; i < this.processedData.length; i++){
            if(this.processedData[i].countriesAndTerritories === country){
                return i;
            }
        }
        return false;
    }

    static dataRefresh(){
        this.processedData = this.exportArray;
        for(let i = 0; i < this.processedData.length; i++){

            this.processedData[i].cases = 0; this.processedData[i].deaths = 0;
            this.processedData[i].casesPer1000 = 0; this.processedData[i].deathsPer1000 = 0;
        }
    }

    static checkDate(lowerdate,higherdate,report){
        if(lowerdate !== undefined && higherdate !== undefined){
        let ReportedDate = Date.parse(`${report.year}-${report.month}-${report.day}`);

        return (ReportedDate > lowerdate && ReportedDate < higherdate) ? true : false;
        }else return true;        
    }

    static fillData(data,lowerdate,higherdate){
        for(let i = 0; i < data.records.length; i++){
            if(this.checkDate(lowerdate,higherdate, data.records[i])){
                let countryName = data.records[i].countriesAndTerritories.replace(/_/g, " ");

                if(this.searchCountry(countryName) !== false){
                    this.updateData(data.records[i],this.searchCountry(countryName))
                }else{
                    this.registerCountry(countryName)
                    this.updateData(data.records[i],this.searchCountry(countryName))
                }
            }
        }
        this.markEmpty();
    }

    static markEmpty(){
        for(let i = 0; i < this.processedData.length; i++){
            if (this.processedData[i].cases === 0 && this.processedData[i].deaths === 0){
                this.processedData[i].cases = "No data"; this.processedData[i].deaths = "No data";
            }
        }
    }
    static checkEmpty(){
        let counter = 0;
        for(let i = 0; i < this.processedData.length; i++){
            if(this.processedData[i].cases === "No data" && this.processedData[i].deaths === "No data"){
                counter++;
            }
        }
        console.log(counter + " " + this.processedData.length);
        return (counter === this.processedData.length);
    }

    static updateData(reportedCase, indexOfCountry){
        let current = this.processedData[indexOfCountry];
        if(current.population === 0){
            current.population = reportedCase.popData2019;
        }

        current.cases = current.cases + reportedCase.cases;
        current.deaths = current.deaths + reportedCase.deaths;

        if(current.population === null){
            current.casesPer1000 = "No data";
            current.deathsPer1000 = "No data";
        }else{
        current.casesPer1000 = ((current.totalCases / current.population) * 1000).toPrecision(3);
        current.deathsPer1000 = ((current.totalDeaths / current.population) * 1000).toPrecision(3);
        }
        
    }

    static countTotal(reportedCase,countryName){
        let current = this.processedData[this.searchCountry(countryName)]

        current.totalCases = current.totalCases + reportedCase.cases;
        current.totalDeaths = current.totalDeaths + reportedCase.deaths;
    }

    static readAll(data){
        for(let i = 0; i < data.records.length; i++){
                let countryName = data.records[i].countriesAndTerritories.replace(/_/g, " ");

                if(this.searchCountry(countryName) !== false){
                    this.countTotal(data.records[i],countryName);
                }else{
                    this.registerCountry(countryName)
                    this.countTotal(data.records[i],countryName);
                }
        }
    }
}