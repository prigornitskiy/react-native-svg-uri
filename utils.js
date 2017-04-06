export const camelCase = value => value.replace(/-([a-z])/g, g => g[1].toUpperCase());

export const camelCaseNodeName = ({nodeName, nodeValue}) => ({nodeName: camelCase(nodeName), nodeValue});

export const removePixelsFromNodeValue = ({nodeName, nodeValue}) => ({nodeName, nodeValue: nodeValue.replace('px', '')});

export const transformStyle = (nodeName, nodeValue, fillProp, ignorePros = []) => {
  if (nodeName === 'style') {
    return nodeValue.split(';')
      .reduce((acc, attribute) => {
        const [property, value] = attribute.split(':');
        if (property == "" || ignoreAttrs( property, ignorePros ) )
          return acc;
        else
          return {...acc, [camelCase(property)]: fillProp && property === 'fill' ? fillProp : value };
      }, {});
  }
  return null;
};

export const ignoreAttrs = (attr, list) =>
{
  return list.indexOf( attr ) !== -1;
}

export const transformAttrValues = ({nodeName, nodeValue}) =>
{

  switch( nodeName ){
    case 'points':
      // adobe illustrator outputs points without commas
      // but we need to be careful not to mess up point values like; '1 2, 3 4'
      nodeValue = nodeValue.indexOf( ',' ) === -1 ? nodeValue.replace( /\s/g, ',' ) : nodeValue;
      break;
  }

  return ({nodeName, nodeValue});
}

export const getEnabledAttributes = enabledAttributes => ({nodeName}) => enabledAttributes.includes(nodeName);
