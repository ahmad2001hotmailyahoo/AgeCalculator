var year = document.getElementById("input-year")
var month = document.getElementById("input-month")
var day = document.getElementById("input-day")

year.addEventListener("input", ageExtractor)
month.addEventListener("input", ageExtractor)
day.addEventListener("input", ageExtractor)

var dateObject = {
  year: "",
  month: "",
  day: "",
}

function isNumeric(value) {
  return value.match(/^[0-9]+$/)
}

function checkErrorStatus(error,label,input) {
  if(document.getElementById(`${error}`).textContent == ''){
    document.getElementById(`${label}`).style.color = "black"
    input.style.borderColor = "black"
    input.style.outlineColor = "black"
  }
  else{
    document.getElementById(`${label}`).style.color = "red"
    input.style.borderColor = "red"
    input.style.outlineColor = "red"
  }

}

function setError(errorOf, errorMessage) {
  document.getElementById(`${errorOf}`).textContent = `${errorMessage}`
  checkErrorStatus('error-year','year-label',year)
  checkErrorStatus('error-month','month-label',month)
  checkErrorStatus('error-day','date-label',day)
  if(errorMessage != ""){
    setDate("--","--","--",year)
  }
}

function isLeapyear(year) {
  if (year % 400 == 0) return true
  else if (year % 100 == 0) return false
  else if (year % 4 == 0) return true
}

function setDate(day ,month ,year) {
	document.getElementById("year-number").textContent = `${year}`
	document.getElementById("month-number").textContent = `${month}`
	document.getElementById("day-number").textContent = `${day}`
}

function getMonthDay(birth_year, today_year, month) {
  month = month && isNumeric(month) ? parseInt(month) : 0
  console.log(birth_year, today_year,month,month == 11)
  if (month == 1) return 31
  else if (month == 2 && ( isLeapyear(birth_year) || isLeapyear(today_year))) return 29
  else if (month == 2) return 28
  else if (month == 3) return 31
  else if (month == 4) return 30
  else if (month == 5) return 31
  else if (month == 6) return 30
  else if (month == 7) return 31
  else if (month == 8) return 31
  else if (month == 9) return 30
  else if (month == 10) return 31
  else if (month == 11) return 30
  else if (month == 12) return 31
  else return 31
}

function getAge(
  birth_day,
  birth_month,
  birth_year,
  today_date,
  today_month,
  today_year
) {
  let isError = true
  if (!(birth_year >= 1900 && birth_year <= 2100)) {
    setError("error-year", "Enter valid year")
    isError = false		
  }
  else setError("error-year", "")

  if (!(birth_month >= 1 && birth_month <= 12)) {
    setError("error-month", "Enter valid month")
    isError = false
  }
  else setError("error-month", "")

  if (getMonthDay(birth_day, today_year, birth_month) < birth_day) {
    setError("error-day", "Enter valid day")
    isError = false
  }
  else   setError("error-day", "")

  if (isError) {
    let year = today_year - birth_year
    let month = today_month - birth_month
    let day = today_date - birth_day
    if (month < 0) {
      year = year - 1
      month = 12 + month
    }
    if (day < 0) {
      month = month - 1
      if (month < 0) {
        year -= 1
        month = 12 + month
      }
        day = day + getMonthDay(birth_year, today_year, birth_month)

    }
		setDate(day ,month ,year)

  }
}

function ageExtractor(e) {
  const today = new Date()
  dateObject = {
    ...dateObject,
    [e.target.name]: e.target.value,
  }
  if (
    isNumeric(dateObject["day"]) &&
    isNumeric(dateObject["month"]) &&
    isNumeric(dateObject["year"])
  ) {
    getAge(
      dateObject["day"],
      dateObject["month"],
      dateObject["year"],
      today.getDate(),
      today.getMonth() + 1,
      today.getFullYear()
    )
  } else {
		if (dateObject["day"] == '') setError("error-day", "This field must not be empty")
		else {
    if(!isNumeric(dateObject["day"]) || getMonthDay(today.getFullYear(), dateObject["year"], dateObject["month"]) < dateObject["day"] ) 
        setError("error-day", "Enter valid day");
      else setError("error-day", "");
    } 
		if (dateObject["month"] == '') {
      alert(123)
      setError("error-month", "This field must not be empty")
    }
		else {
      if (!isNumeric(dateObject["month"]) || !(parseInt(dateObject["month"]) >= 1 && parseInt(dateObject["month"]) <= 12)) {
        setError("error-month", "Enter valid month")  
      }
      else setError("error-month", "")
    }
		if (dateObject["year"] == '') setError("error-year", "This field must not be empty")
		else {
  		if (!isNumeric(dateObject["year"]) || !(parseInt(dateObject["year"]) >= 1900 && parseInt(dateObject["year"]) <= 2100)) 
        setError("error-year", "Enter valid year")
      else setError("error-year", "")
    }
  }
}
