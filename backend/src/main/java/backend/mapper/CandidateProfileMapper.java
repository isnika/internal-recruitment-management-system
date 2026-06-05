package backend.mapper;

import backend.DTO.candidateProdile.CandidateProfileResponse;
import backend.DTO.candidateProdile.CreateCandidateProfileRquest;
import backend.DTO.candidateProdile.UpdateCandidateProfileRequest;
import backend.entity.CandidateProfile;
import backend.entity.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CandidateProfileMapper {

  public static CandidateProfile toEntity(CreateCandidateProfileRquest request, User user) {
    if (request == null) {
      return null;
    }

    return CandidateProfile.builder()
        .gender(request.getGender())
        .dateOfBirth(request.getDateOfBirth())
        .phone(request.getPhone())
        .address(request.getAddress())
        .taxCode(request.getTaxCode())
        .citizenId(request.getCitizenId())
        .releaseDate(request.getReleaseDate())
        .socialLink(request.getSocialLink())
        .bankAccountName(request.getBankAccountName())
        .user(user)
        .build();
  }

  public static CandidateProfileResponse toResponse(CandidateProfile profile) {
    if (profile == null) {
      return null;
    }

    return CandidateProfileResponse.builder()
        .id(profile.getId())
        .gender(profile.getGender())
        .dateOfBirth(profile.getDateOfBirth())
        .phone(profile.getPhone())
        .address(profile.getAddress())
        .taxCode(profile.getTaxCode())
        .citizenId(profile.getCitizenId())
        .releaseDate(profile.getReleaseDate())
        .socialLink(profile.getSocialLink())
        .bankAccountName(profile.getBankAccountName())
        .userId(profile.getUser() != null ? profile.getUser().getId() : null)
        .email(profile.getUser() != null ? profile.getUser().getEmail() : null)
        .firstName(profile.getUser() != null ? profile.getUser().getFirstName() : null)
        .lastName(profile.getUser() != null ? profile.getUser().getLastName() : null)
        .status(
            profile.getUser() != null && profile.getUser().getStatus() != null ? profile.getUser().getStatus().name()
                : null)
        .avatarUrl(profile.getUser() != null ? profile.getUser().getAvatarUrl() : null)
        .build();
  }

  public static void updateEntity(CandidateProfile profile, UpdateCandidateProfileRequest request) {
    if (profile == null || request == null) {
      return;
    }

    if (profile.getUser() != null) {
      if (request.getFirstName() != null && !request.getFirstName().trim().isEmpty()) {
        profile.getUser().setFirstName(request.getFirstName().trim());
      }
      if (request.getLastName() != null && !request.getLastName().trim().isEmpty()) {
        profile.getUser().setLastName(request.getLastName().trim());
      }
    }

    profile.setGender(request.getGender());
    profile.setDateOfBirth(request.getDateOfBirth());
    profile.setPhone(request.getPhone());
    profile.setAddress(request.getAddress());
    profile.setTaxCode(request.getTaxCode());
    profile.setCitizenId(request.getCitizenId());
    profile.setReleaseDate(request.getReleaseDate());
    profile.setSocialLink(request.getSocialLink());
    profile.setBankAccountName(request.getBankAccountName());
  }
}
