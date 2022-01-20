export default {

  validate (value, rules) { 

    if (rules == null) { return [] }

    if (!Array.isArray(rules)) {
      if (typeof rules === 'string' || rules instanceof String) {
        rules = [rules]
      } else {
        console.log('Input parameter rules is not a string - ' + rules)
        throw('Invalid value in rule parameter')
      }
    }

    let errors = []
    rules.forEach( (r) => {
      let ruleSegments = r.split('.');
      switch (ruleSegments[0]) {
        case 'required':
          if (value.trim().length == 0) { errors.push('Please enter a value')}
          break
        case 'min-len':
          if (value.trim().length < ruleSegments[1]) { errors.push('Entry is less than minimum required length')}
          break
        case 'max-len':
          if (value.trim().length > ruleSegments[1]) { errors.push('Entry exceeds maximum permitted length')}
          break
        case 'min-val':
          if (value < ruleSegments[1]) { errors.push('Entry is less than minimum required')}
          break
        case 'max-val':
          if (value > ruleSegments[1]) { errors.push('Entry exceeds maximum permitted')}
          break
      }
    })

    return errors

  }
  
}
