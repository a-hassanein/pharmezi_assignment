from import_export import resources
from .models import SellerProducts

class SellerProductsResource(resources.ModelResource):
    class meta:
        model = SellerProducts