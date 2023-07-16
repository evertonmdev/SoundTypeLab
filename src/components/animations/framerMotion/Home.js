import { animate } from 'framer-motion';

const OpenCortina = async self => {
    await animate("#CortinaDivPrincipal", {
      display: "flex",
      width: "100%",
      opacity: 1
    }, {
      delay: 2,
      duration: 0.8,
      ease: "easeInOut",
    })
    self.destroy()
}


export { OpenCortina }