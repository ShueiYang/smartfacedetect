
export function calculateFaceLocation (data) {
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    const boxData = data.outputs[0].data.regions
            
    if (boxData.length === 0)
    return null;
            
    else if (boxData.length === 1) {
        const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        return {
            leftCol: clarifyFace.left_col * width,
            topRow: clarifyFace.top_row * height,
            rightCol: width - (clarifyFace.right_col * width),
            bottomRow: height - (clarifyFace.bottom_row * height)
        }
    } else {
        return boxData.map(item => {
            const clarifyFace = item.region_info.bounding_box;
            return {
                leftCol: clarifyFace.left_col * width,
                topRow: clarifyFace.top_row * height,
                rightCol: width - (clarifyFace.right_col * width),
                bottomRow: height - (clarifyFace.bottom_row * height)
            }
        }) 
    }
};