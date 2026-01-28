variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "westeurope"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "tango-site"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "container_image" {
  description = "Docker image to deploy"
  type        = string
  default     = "tangositeacr.azurecr.io/tango-site:latest"
}
