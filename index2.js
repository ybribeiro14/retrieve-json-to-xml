module.exports = function (originData, mappedData) {
    let OrderHeader = {};

    mappedData.forEach(field => {       
        const target = field.target.split('.')

        if(target.length === 1) {
            let value = field.static_value;

            if(field.origin) {    
                value = field.origin.split('.').reduce((o,i)=> o[i], originData);
            } 
    
            if(field.convert_function) {
                var formattedField = new Function("value", field.convert_function);
                value = formattedField(value)
            }
    
            OrderHeader = {
                ...OrderHeader,
                [target[0]] : value
            }
        }
    });

    let  OrderDetails = {
        StockLine : [] 
    }

    const mappedStockLineFilter = mappedData.filter(a => a.target.includes('OrderDetails.StockLine') )

    const objStockLineMapped = {};

    mappedStockLineFilter.forEach(field => {
        const tag = field.target.split('.')
        objStockLineMapped[tag[tag.length - 1]] =  {
            ...field,
            origin: field.origin ? field.origin.substring(field.origin.indexOf("x.") + 2) : ''
        }
    })
    
    originData.items.map((itemData, index) => {

        const objItem = {};
        Object.keys(objStockLineMapped).forEach((item) => {
            let value = objStockLineMapped[item].static_value

            if(objStockLineMapped[item].origin) {  
                value = objStockLineMapped[item].origin.split('.').reduce((o,i)=> o[i], itemData);
            } 

            if(objStockLineMapped[item].convert_function) {
                const formattedField = new Function("value", "a", objStockLineMapped[item].convert_function);            
                value = formattedField(value, index)                
            }
            objItem[item] = value
            
        });

        OrderDetails.StockLine.push(objItem)

    })

    const mappedCommentLineFilter = mappedData.filter(a => a.target.includes('OrderDetails.CommentLine') )
    mappedCommentLineFilter.forEach((field, index) => {       
        const target = field.target.split('.')
        let value = field.static_value;

        if(field.origin) {    
            value = field.origin.split('.').reduce((o,i)=> o[i], originData);
        } 

        if(field.convert_function) {
            var formattedField = new Function("value", "a", field.convert_function);
            value = formattedField(value, index)
        }

        if(value) {
            OrderDetails.CommentLine = {
                ...OrderDetails.CommentLine,
                [target[2]] : value
            }
        }
    });

    const mappedFreightLineFilter = mappedData.filter(a => a.target.includes('OrderDetails.FreightLine') )
    mappedFreightLineFilter.forEach((field, index) => {       
        const target = field.target.split('.')
        let value = field.static_value;

        if(field.origin) {    
            value = field.origin.split('.').reduce((o,i)=> o[i], originData);
        } 

        if(field.convert_function) {
            var formattedField = new Function("value", "a", field.convert_function);
            value = formattedField(value, index)
        }

        if(value) {
            OrderDetails.FreightLine = {
                ...OrderDetails.FreightLine,
                [target[2]] : value
            }
        }
    });

    const finalData = {
        Orders: {
            OrderHeader,
            OrderDetails
        }
    }
	return finalData;
}