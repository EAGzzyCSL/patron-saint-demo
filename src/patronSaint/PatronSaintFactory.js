import PatronSaintMixin from './PatronSaintMixin'
export default (vm = {}) => ({
  ...vm,
  mixins: [ ...(vm.mixins || []), PatronSaintMixin ]
})
